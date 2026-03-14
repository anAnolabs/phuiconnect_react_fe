const { chromium } = require('playwright');
const fs = require('fs');

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions for mobile view
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  console.log('Navigating to app...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });

  console.log('Waiting for app to load...');
  await page.waitForTimeout(2000);

  // Take Home Screen
  console.log('Taking Home screen screenshot...');
  const homePath = '/Users/anlampard/.gemini/antigravity/brain/102c52ee-951f-43a4-a9d5-ee978ffcac71/home_updated.png';
  await page.screenshot({ path: homePath });
  console.log(`Saved to ${homePath}`);

  // Need to click through tabs
  // 1. Search / Stadiums
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('div[data-testid="tab-button"]');
    if (tabs.length > 1) tabs[1].click();
  });
  await page.waitForTimeout(1000);
  console.log('Taking Stadium screen screenshot...');
  const stadiumPath = '/Users/anlampard/.gemini/antigravity/brain/102c52ee-951f-43a4-a9d5-ee978ffcac71/fields_updated.png';
  await page.screenshot({ path: stadiumPath });

  // 2. Teams
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('div[data-testid="tab-button"]');
    if (tabs.length > 2) tabs[2].click();
  });
  await page.waitForTimeout(1000);
  console.log('Taking Team screen screenshot...');
  const teamPath = '/Users/anlampard/.gemini/antigravity/brain/102c52ee-951f-43a4-a9d5-ee978ffcac71/team_updated.png';
  await page.screenshot({ path: teamPath });

  // 3. Profile
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('div[data-testid="tab-button"]');
    if (tabs.length > 3) tabs[3].click();
  });
  await page.waitForTimeout(1000);
  console.log('Taking Profile screen screenshot...');
  const profilePath = '/Users/anlampard/.gemini/antigravity/brain/102c52ee-951f-43a4-a9d5-ee978ffcac71/profile_updated.png';
  await page.screenshot({ path: profilePath });

  await browser.close();
  console.log('Done!');
}

takeScreenshots().catch(console.error);
