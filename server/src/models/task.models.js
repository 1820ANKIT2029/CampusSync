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
    description: String,
    dueDate: Date,
    isCompleted: { 
        type: Boolean, 
        default: false 
    }
});

const taskParticipantSchema = new Schema({
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

export const Task = model("Task", taskSchema);
export const TaskParticipant = model("TaskParticipant", taskParticipantSchema);