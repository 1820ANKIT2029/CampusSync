import { Schema } from 'mongoose';

export const taskSchema = new Schema({
    event: { 
        type: Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: String,
    dueDate: Date,
    isCompleted: { 
        type: Boolean, 
        default: false 
    }
});

export const taskParticipantSchema = new Schema({
    task: { 
        type: Schema.Types.ObjectId, 
        ref: 'Task', 
        required: true 
    },
    participant: { 
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    }
});