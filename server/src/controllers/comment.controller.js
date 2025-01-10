import { Comment } from "../models/comment.model.js";

export const handleCommentConn = (socket) => {
    socket.eventId = socket.handshake.query.eventId;
    socket.join(socket.eventId);

    console.log(socket.handshake.query.eventId)
    console.log(socket.eventId);


    socket.on("newComment", async (comment) => {
        try {
            console.log(comment);
            const newComment = {
                userId: socket.profileId, // Assuming socket.profileId is set elsewhere
                eventId: socket.eventId,
                comment,
            };

            const createdComment = await Comment.create(newComment);

            // Fetch user details separately (assuming Comment.userId is ObjectId reference)
            const populatedComment = await Comment.findById(createdComment._id)
                .populate("userId", "_id name profilePic"); 

            // Emit the new comment to all clients in the event room
            socket.to(socket.eventId).emit("getNewComment", populatedComment);
            socket.emit("getNewComment", populatedComment);

        } catch (error) {
            console.error("Message error:", error);
            socket.emit("commenterror", error.message);
        }
    });

    socket.on("disconnect", () => {
        socket.leave(socket.eventID);
    });
};