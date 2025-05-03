import WebSocket from 'ws';

export type WebSocketMessage = {
  type: 'scan' | 'completion' | 'nft_claim' | 'comment' | 'like';
  data: any;
};

export class WebSocketManager {
  private connections: Map<string, WebSocket>;

  constructor() {
    this.connections = new Map();
  }

  addConnection(userId: string, ws: WebSocket) {
    this.connections.set(userId, ws);
    console.log(`User ${userId} connected`);
  }

  removeConnection(userId: string) {
    this.connections.delete(userId);
    console.log(`User ${userId} disconnected`);
  }

  handleMessage(userId: string, message: WebSocketMessage) {
    console.log(`Received message from ${userId}:`, message);
    // Handle different message types
    switch (message.type) {
      case 'scan':
        this.broadcastToProject(message.data.projectId, message);
        break;
      case 'completion':
        this.broadcastToProject(message.data.projectId, message);
        break;
      case 'nft_claim':
        this.broadcastToProject(message.data.projectId, message);
        break;
      case 'comment':
      case 'like':
        this.broadcastToProject(message.data.projectId, message);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  sendToUser(userId: string, message: WebSocketMessage) {
    const ws = this.connections.get(userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  broadcastToProject(projectId: string, message: WebSocketMessage) {
    // In a real app, you would maintain a mapping of project subscribers
    // For now, broadcast to all connected users
    this.connections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }
}