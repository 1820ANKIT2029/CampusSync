import express from 'express';
import dotenv from 'dotenv';

import http from 'http';
import { Server } from 'socket.io';
import cron from 'node-cron';

import { connectToMongoDB } from './db/ConnectMongoDB.js';

import { updateGlobalAura, deleteOldNotification } from './controllers/cron.controller.js';

import { GlobalLeaderBoard, LocalLeaderBoard } from './controllers/LeaderBoard.controller.js';
import { CheckTokenInSocket } from './controllers/socketAuth.controller.js'
import { NotificationSocket } from './controllers/notification.controller.js';

dotenv.config();

const PORT = process.env.SECOND_PORT;

const StartServer = async () => {
    try{
        await connectToMongoDB();

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
        cron.schedule('59 23 * * *', deleteOldNotification);

        const notification = io.of("notification");
        const leaderBoard = io.of("leaderBoard");
        const eventLeaderboard = io.of("eventLeaderboard");
        //const chatRoom = io.of("chatRoom");

        // auth of socket
        //chatRoom.use(CheckTokenInSocket);
        notification.use(CheckTokenInSocket);

        leaderBoard.on('connection', GlobalLeaderBoard);
        eventLeaderboard.on('connection', LocalLeaderBoard);
        notification.on('connection', NotificationSocket);

        app.get('/', (req, res) => {
            res.send('Notification server is running.');
        });

        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    }catch(err){
        console.log(err);
    }
};

StartServer();