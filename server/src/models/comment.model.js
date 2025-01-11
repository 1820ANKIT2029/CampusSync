import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
	{
		userId: { 
			type: Schema.Types.ObjectId, 
			ref: 'Profile', 
			required: true 
		},
		eventId: {
			type: Schema.Types.ObjectId, 
			ref: 'Event',
			required: true
		},
		comment: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Comment = model("Chat", commentSchema);