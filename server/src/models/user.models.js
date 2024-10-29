import mongoose, { Schema, model } from 'mongoose';

// Image schema use in profile schema
const imageSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    name: String,
    data: Buffer,
    contentType: String
}, { timestamps: true });

// User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
    }
}, { timestamps: true });

// Profile schema ( use same model for TaskParticipant)
const profileScheme = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
    },
    year: {
        type: Number,
    },
    branch: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    profilePic: {
        type: String,
    },
    aura: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });

// model of User, Profile
export const User = model("User", userSchema);
export const Profile = model("Profile", profileScheme);
export const Image = model("Image", imageSchema);