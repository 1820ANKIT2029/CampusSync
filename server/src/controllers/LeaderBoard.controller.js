import { Profile } from "../models/user.models.js";

const getTopProfiles = async () => {
    return await Profile.find()
        .sort({ aura: -1 })
        .limit(100)
        .select("name aura profilePic")
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
}