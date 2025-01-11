import mongoose, { Schema, model } from 'mongoose';

export const GENDER = ["male", "female", "Not set"];
export const BRANCH = [
    "Computer Science and Engineering", 
    "Electronics and Communication Engineering", 
    "Electrical Engineering", 
    "Mechanical Engineering", 
    "Civil Engineering", 
    "Biotechnology", 
    "Chemical Engineering",
    "Production and Industrial Engineering",
    "Engineering and Computational Mechanics",
    "Not set"
];
export const YEAR = [0, 1, 2, 3, 4];

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
    bio: {
        type: String,
        default: null
    },
    year: {
        type: Number,
        default: 0,
        enum: YEAR
    },
    branch: {
        type: String,
        default: "Not set"
    },
    email: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: "Not set",
        enum: GENDER,
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dwlputtun/image/upload/v1736586513/ei2hdv1f0oqhj3skwom8.webp",
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