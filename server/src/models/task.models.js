import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    eventId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    submissionType: {
        type: String,
        required: true,
        enum: ["pdf", "image", "video"]
    }
}, { timestamps: true });

const taskParticipantSchema = new Schema({
    taskId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Task', 
        required: true 
    },
    participantId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

export const Task = model("Task", taskSchema);
export const TaskParticipant = model("TaskParticipant", taskParticipantSchema);