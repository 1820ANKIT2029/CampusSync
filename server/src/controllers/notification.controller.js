import { History } from "../models/history.model.js";
import { SocketTokenVerify } from "./socketAuth.controller.js"
import jwt from 'jsonwebtoken';


export const addNotification = async (profileId, message) => {
    try {
        const notification = new History({
            ProfileId: profileId,
            message: message
        });
        await notification.save();
        console.log("Notification added successfully");
    } catch (error) {
        console.error("Error adding notification:", error);
    }
};


const getNotification = async (profileId) => {
    try{
        const notifications = await History.find({ProfileId: profileId, seen: false}).sort({createdAt: -1});
        await History.updateMany(
            { ProfileId: profileId, seen: false },
            { $set: { seen: true } }
        );
        return notifications;
    }catch(error){
        throw new Error("Error in Get Notification");
    }
};


export const NotificationSocket = async (socket) => {
    const ProfileId = socket.profileId;

    const sendNoticaficationUpdate = async () => {
        try{
            const result = await getNotification(ProfileId);
            
            if(result.length != 0){
                socket.emit("NotificationUpdate", result);
            }
        }catch(err){
            socket.emit("authError", "error");
        }
        
    };

    await sendNoticaficationUpdate();

    const NotificationInterval = setInterval(sendNoticaficationUpdate, 60000);

    socket.on('disconnect', () => {
        clearInterval(NotificationInterval);
        console.log(`Client disconnected: ${socket.id}`);
    });
};