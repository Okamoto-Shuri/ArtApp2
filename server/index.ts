import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { pool } from './db';
import { initializeWebSocket } from './websocket';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import locationRoutes from './routes/locations';
import nftRoutes from './routes/nfts';
import { errorHandler } from './middleware/error';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

// Initialize WebSocket
const wsManager = initializeWebSocket(server);

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

// Test database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Database connection error:', err));

// Make WebSocket manager available to routes
app.set('wsManager', wsManager);

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/nfts', nftRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});