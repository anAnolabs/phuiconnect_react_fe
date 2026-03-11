// =============================================
// PhuiConnect Backend - Entry Point
// =============================================
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Middleware ----
app.use(cors({
  origin: [
    'http://localhost:8080',    // React Native Web (webpack)
    'http://localhost:3000',    // Alternative web dev
    'http://localhost:19006',   // Expo web
    'http://10.0.2.2:3001',    // Android emulator
  ],
  credentials: true,
}));

app.use(express.json());

// ---- Routes ----
app.use('/api/auth', authRoutes);

// ---- Health Check ----
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'PhuiConnect API',
    timestamp: new Date().toISOString(),
  });
});

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║  ⚽ PhuiConnect API Server              ║
║  Running on http://localhost:${PORT}       ║
║  Environment: ${process.env.NODE_ENV || 'development'}            ║
╚══════════════════════════════════════════╝
  `);
});

export default app;
