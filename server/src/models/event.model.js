import { Schema } from 'mongoose';

export const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    location: String,
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'Organizer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const eventParticipantSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId, 
        ref: 'Event',
        required: true
    },
    participant: { 
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    points: { 
        type: Number, 
        default: 0 
    }
});