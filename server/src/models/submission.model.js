import { Schema, model } from 'mongoose';

const submissionSchema = new Schema({
    participantId: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    taskId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Task', 
        required: true 
    },
    fileId: { 
        type: Schema.Types.ObjectId, 
        ref: 'File', 
        required: true 
    },
    isCheck: { 
        type: Boolean, 
        default: false 
    }
});

export const Submission = model("Submission", submissionSchema);