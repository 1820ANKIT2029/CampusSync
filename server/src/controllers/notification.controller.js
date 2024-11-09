import { History } from "../models/history.model.js";
import { SocketTokenVerify } from "./socketAuth.controller.js"
import jwt from 'jsonwebtoken';


const getNotification = async (profileId) => {
    try{
        const notifications = await History.find({ProfileId: profileId, seen: false}).sort({createdAt: -1});
        for(const notification of notifications){
            await History.findByIdAndUpdate(notification._id, {seen: true});
        }
        return notifications;
    }catch(error){
        throw new Error("Error in Get Notification");
    }
};


export const NotificationSocket = async (socket) => {
    const ProfileId = jwt.verify(socket.handshake.auth.token, process.env.SESSION_SECRET).profileId;
    console.log(`Client disconnected: ${socket.id}, profileId: ${ProfileId}`);
    const sendNoticaficationUpdate = async () => {
        const result = await getNotification(ProfileId);
        if(result){
            socket.emit("NotificationUpdate", result);
        }
        else{
            socket.emit("NotificationUpdate", "no data");
        }
    };

    await sendNoticaficationUpdate();

    const NotificationInterval = setInterval(sendLeaderboardUpdate, 60000*5);

    socket.on('disconnect', () => {
        clearInterval(NotificationInterval);
        console.log(`Client disconnected: ${socket.id}`);
    });
};