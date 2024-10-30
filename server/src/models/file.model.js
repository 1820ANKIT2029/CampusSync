import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
    cloudId: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    // URL to access the file in storage
    url: {
        type: String,
        required: true
    },
    // MIME type, e.g., 'image/png', 'application/pdf', etc.  
    type: {
        type: String,
        required: true
    },
    // File size in bytes
    size: {
        type: Number
    },      
    uploadedAt: { 
        type: Date, 
        default: Date.now 
    },
});


export const File = model("File", FileSchema);