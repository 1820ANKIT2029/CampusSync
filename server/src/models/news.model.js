import mongoose, { Schema, model } from 'mongoose';

// news schema
const newsSchema = new Schema({
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

// model of User, Profile
export const News = model("News", newsSchema);