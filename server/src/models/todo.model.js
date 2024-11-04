import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    profileId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    topic: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Todo = model("Todo", todoSchema);