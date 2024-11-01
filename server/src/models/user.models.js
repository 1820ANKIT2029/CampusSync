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
    },
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
        default: null,
    },
    year: {
        type: Number,
        default: 0,
    },
    branch: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: "Not set",
        enum: ["male", "female", "Not set"],
    },
    profilePic: {
        type: String,
        default: null,
    },
    aura: {
        type: Number,
        default: 0,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// model of User, Profile
export const User = model("User", userSchema);
export const Profile = model("Profile", profileScheme);
export const Image = model("Image", imageSchema);