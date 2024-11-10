import { Profile } from "../models/user.models.js";
import { EventParticipant } from "../models/event.model.js";

const getTopProfiles = async () => {
    return await Profile.find({isAdmin: false})
        .sort({ aura: -1 })
        .limit(100)
        .select("name aura profilePic year branch")
        .exec();
};

const getTopProfilesByEvent = async (eventID) => {
    return await EventParticipant.find({eventId: eventID}).populate('participantId', 'profilePic name')
        .sort({ points: -1 })
        .exec();
};

export const GlobalLeaderBoard = async (socket) => {
    const sendLeaderboardUpdate = async () => {
        const topProfiles = await getTopProfiles();
        socket.emit("leaderboardUpdate", topProfiles);
    };

    await sendLeaderboardUpdate();

    const leaderboardInterval = setInterval(sendLeaderboardUpdate, 60000);

    socket.on('disconnect', () => {
        clearInterval(leaderboardInterval);
        console.log(`Client disconnected: ${socket.id}`);
    });
};

export const LocalLeaderBoard = async (socket) => {
    const eventID = socket.handshake.query.eventID;

    const sendLeaderboardUpdate = async () => {
        const topProfiles = await getTopProfilesByEvent();
        socket.emit("leaderboardUpdate", topProfiles);
    };

    await sendLeaderboardUpdate();

    const leaderboardInterval = setInterval(sendLeaderboardUpdate, 60000);

    socket.on('disconnect', () => {
        clearInterval(leaderboardInterval);
        console.log(`Client disconnected: ${socket.id}`);
    });
}