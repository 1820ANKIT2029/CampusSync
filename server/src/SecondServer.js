import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { GlobalLeaderBoard } from './controllers/LeaderBoard.controller.js';

dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server
const io = new Server(server, {
    cors: {
        origin: '*',  // Allow cross-origin requests (change as needed)
    }
});

const notification = io.of("notification");
const leaderBoard = io.of("leaderBoard");
const eventLeaderboard = io.of("eventLeaderboard");
const chatRoom = io.of("chatRoom");

leaderBoard.on('connection', GlobalLeaderBoard);


// Set up an HTTP endpoint (optional)
app.get('/', (req, res) => {
    res.send('Notification server is running.');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Listen for custom events, e.g., client requests for notifications
    socket.on('request_notification', (data) => {
        console.log(`Notification request received from ${socket.id}:`, data);

        // Emit a notification back to the specific client
        socket.emit('notification', {
            message: 'This is your custom notification!',
            timestamp: new Date(),
        });
    });

    // Listen for client disconnections
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Function to emit notifications to all connected clients
function broadcastNotification(message) {
    io.emit('notification', {
        message: message || 'New notification for all users!',
        timestamp: new Date(),
    });
}

// Example of sending a notification every 10 seconds (for demonstration)
setInterval(() => {
    broadcastNotification('This is a scheduled notification!');
}, 10000);

// Start the server
const PORT = process.env.SECOND_PORT;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});