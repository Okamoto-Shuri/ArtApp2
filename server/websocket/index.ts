import WebSocket from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { WebSocketManager } from './manager';

export const initializeWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });
  const wsManager = new WebSocketManager();

  wss.on('connection', async (ws, req) => {
    try {
      // Get token from URL params
      const url = new URL(req.url!, `http://${req.headers.host}`);
      const token = url.searchParams.get('token');

      if (!token) {
        ws.close(1008, 'Authentication required');
        return;
      }

      // Verify token
      const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      
      // Add connection to manager
      wsManager.addConnection(user.id, ws);

      // Handle incoming messages
      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message);
          wsManager.handleMessage(user.id, data);
        } catch (error) {
          console.error('Error handling message:', error);
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        wsManager.removeConnection(user.id);
      });

    } catch (error) {
      console.error('WebSocket connection error:', error);
      ws.close(1008, 'Authentication failed');
    }
  });

  return wsManager;
};