import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
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
        ref: 'Profile'
    },
    auraDistributed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const eventParticipantSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId, 
        ref: 'Event',
        required: true
    },
    participantId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    points: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });

export const Event = model("Event", eventSchema);
export const EventParticipant = model("EventParticipant", eventParticipantSchema);