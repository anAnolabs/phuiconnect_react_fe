const https = require('https');
const fs = require('fs');
const path = require('path');

// Basic env loading
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          process.env[match[1]] = match[2].trim();
        }
      });
    }
  } catch (e) {
    // Ignore error
  }
}

loadEnv();

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = process.env.FIGMA_FILE_ID;

if (!TOKEN || !FILE_ID) {
  console.error("❌ Missing FIGMA_TOKEN or FIGMA_FILE_ID in environment variables.");
  console.error("Please create a .env file based on .env.example");
  process.exit(1);
}

// Configuration options
const FORMAT = process.env.FIGMA_EXPORT_FORMAT || 'png'; // png, svg, jpg
const SCALE = process.env.FIGMA_EXPORT_SCALE || '2'; // 1, 2, 3, etc. for png/jpg
const OUTPUT_DIR = path.resolve(__dirname, '../src/assets/figma');

const TARGET_NODE_IDS = process.env.FIGMA_NODE_IDS; 

// Simple helper to make HTTPS requests
function fetchFigmaAPI(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: `/v1${endpoint}`,
      method: 'GET',
      headers: {
        'X-Figma-Token': TOKEN
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Failed to parse JSON response"));
          }
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    });
    req.on('error', err => {
      fs.unlink(destPath, () => reject(err));
    });
  });
}

async function run() {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let nodeIdsToExport = [];
    let nodeNames = {};

    if (TARGET_NODE_IDS) {
      nodeIdsToExport = TARGET_NODE_IDS.split(',').map(id => id.trim());
      console.log(`Fetching specific nodes: ${nodeIdsToExport.join(', ')}...`);
      const nodesData = await fetchFigmaAPI(`/files/${FILE_ID}/nodes?ids=${nodeIdsToExport.join(',')}`);
      
      for (const id in nodesData.nodes) {
         nodeNames[id] = nodesData.nodes[id].document.name;
      }
    } else {
      console.log(`Fetching Figma file structure for ${FILE_ID}...`);
      const fileData = await fetchFigmaAPI(`/files/${FILE_ID}`);
      console.log(`Found file: "${fileData.name}"`);
      
      // Default: Find all components to export (you could change this heuristic)
      function findComponents(document) {
        let nodes = [];
        if (document.type === 'COMPONENT') {
          nodes.push(document);
        } else if (document.children) {
           for (const child of document.children) {
             nodes = nodes.concat(findComponents(child));
           }
        }
        return nodes;
      }
      
      const components = findComponents(fileData.document);
      
      if (components.length === 0) {
        console.warn("⚠️ No COMPONENT nodes found in the Figma file.");
        console.log("Tip: Convert the assets you want to export into Figma Components, or specify FIGMA_NODE_IDS in .env.");
        return;
      }
      
      console.log(`Found ${components.length} components to export.`);
      
      for (const comp of components) {
        nodeIdsToExport.push(comp.id);
        nodeNames[comp.id] = comp.name;
      }
    }
    
    // Process URLs in batches to avoid Figma API limits if there are many nodes
    const batchSize = 100;
    let images = {};
    
    for (let i = 0; i < nodeIdsToExport.length; i += batchSize) {
      const batchIds = nodeIdsToExport.slice(i, i + batchSize);
      
      console.log(`Requesting export URLs for batch ${i / batchSize + 1} (format: ${FORMAT}, scale: ${SCALE})...`);
      
      let exportUrl = `/images/${FILE_ID}?ids=${batchIds.join(',')}&format=${FORMAT}`;
      if (FORMAT !== 'svg') {
        exportUrl += `&scale=${SCALE}`;
      }
      
      const exportData = await fetchFigmaAPI(exportUrl);
      
      if (exportData.err) {
        throw new Error(`Export API error: ${exportData.err}`);
      }
      
      Object.assign(images, exportData.images);
    }
    
    let exportCount = 0;
    let indexTsContent = `/**\n * Auto-generated by figma-export.js\n * Re-export all downloaded assets here.\n */\n\nexport const FigmaAssets = {\n`;
    
    for (const id in images) {
      const imageUrl = images[id];
      if (!imageUrl) {
         console.warn(`⚠️ Warning: Node ${id} ("${nodeNames[id]}") returned null URL. Cannot export.`);
         continue;
      }
      
      // Sanitize filename to be a valid JavaScript identifier piece
      const rawName = nodeNames[id] || id;
      let safeName = rawName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      // Ensure it doesn't start with a number
      if (/^[0-9]/.test(safeName)) safeName = '_' + safeName;
      
      const fileName = `${safeName}.${FORMAT}`;
      const destPath = path.join(OUTPUT_DIR, fileName);
      
      console.log(`Downloading ${fileName}...`);
      await downloadImage(imageUrl, destPath);
      
      // Add to index.ts entry. camelCase the key
      const camelKey = safeName.replace(/_+([a-z0-9])/g, (g) => g[1].toUpperCase());
      indexTsContent += `  ${camelKey}: require('./${fileName}'),\n`;
      
      exportCount++;
    }
    
    indexTsContent += `};\n`;
    
    // Write index.ts
    const indexFile = path.join(OUTPUT_DIR, 'index.ts');
    fs.writeFileSync(indexFile, indexTsContent);
    
    console.log(`\n✅ Successfully exported ${exportCount} assets to src/assets/figma/`);
    console.log(`Updated index: src/assets/figma/index.ts`);

  } catch (err) {
    console.error(`\n❌ Script failed: ${err.message}`);
    process.exit(1);
  }
}

run();
