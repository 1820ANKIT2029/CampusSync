import { Schema, model } from 'mongoose';

// Image schema use in profile schema
const imageSchema = new Schema({
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
}, { timestamps: true });

// Profile schema
const profileScheme = new Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
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
        type: imageSchema
    },

}, { timestamps: true });

// model of User, Profile
const User = model("User", userSchema);
const Profile = model("Profile", profileScheme);

export default {
    User,
    Profile
};