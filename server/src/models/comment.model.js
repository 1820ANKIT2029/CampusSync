import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
	{
		userId: { type: String, required: true }, // user ID
		eventId: { type: String, required: true }, // event ID
		comment: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Comment = model("Chat", commentSchema);