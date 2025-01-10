import { Comment } from "../models/comment.model.js";

export const handleCommentConn = (socket) => {
    socket.eventId = socket.handshake.query.eventID;
    socket.join(socket.eventID);

    socket.on("newComment", async (comment) => {
        try {
            console(comment);
            const message = await Comment.create({
                userId: socket.profileId,
                eventId: socket.eventId,
                comment,
            }).populate("userId", "_id name profilePic");

            socket.to(socket.eventID).emit("newComment", message);
            socket.emit("newComment", message);
        } catch (error) {
            console.error("Message error:", error);
            socket.emit("commenterror", error.message);
        }
    });

    socket.on("disconnect", () => {
        socket.leave(socket.eventID);
    });
};