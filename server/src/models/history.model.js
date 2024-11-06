import { model, Schema } from "mongoose";

const historySchema = new Schema({
    ProfileId: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile', 
        required: true 
    },
    message: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const History = model("History", historySchema);