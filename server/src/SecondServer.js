import express from 'express';
import dotenv from 'dotenv';

import http from 'http';
import { Server } from 'socket.io';
import cron from 'node-cron';

import { GlobalLeaderBoard, LocalLeaderBoard } from './controllers/LeaderBoard.controller.js';
import { CheckTokenInSocket } from './controllers/socketAuth.controller.js'

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

// this cron is responsive for aura distribution after the end of events
// run every hour
cron.schedule('* 1 * * *', updateGlobalAura);

const notification = io.of("notification");
const leaderBoard = io.of("leaderBoard");
const eventLeaderboard = io.of("eventLeaderboard");
const chatRoom = io.of("chatRoom");

// auth of socket
chatRoom.use(CheckTokenInSocket);
notification.use(CheckTokenInSocket);

leaderBoard.on('connection', GlobalLeaderBoard);
eventLeaderboard.on('connection', LocalLeaderBoard)


app.get('/', (req, res) => {
    res.send('Notification server is running.');
});

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('request_notification', (data) => {
        console.log(`Notification request received from ${socket.id}:`, data);

        socket.emit('notification', {
            message: 'This is your custom notification!',
            timestamp: new Date(),
        });
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

function broadcastNotification(message) {
    io.emit('notification', {
        message: message || 'New notification for all users!',
        timestamp: new Date(),
    });
}

setInterval(() => {
    broadcastNotification('This is a scheduled notification!');
}, 10000);

const PORT = process.env.SECOND_PORT;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});