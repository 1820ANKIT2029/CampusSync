import { v2 as cloudinary } from 'cloudinary';

import { File } from "../models/file.model.js";
import { Submission } from "../models/submission.model.js";
import { error } from "./auth.controller.js";

export const upload = async (req, res, next) => {
    const file = req.file;
    console.log(file);
    const { taskId, userId } = req.query;
    try {
        const result = await cloudinary.uploader.upload(file.path);
        console.log(result)
        const newfile = new File({
            cloudId: result.public_id,
            filename: file.originalname,
            url: result.url,
            type: file.mimetype,
            size: file.size
        });

        if(newfile){
            await newfile.save();

            const newsubmission = new Submission({
                userId: userId,
                taskId: taskId,
                fileId: newfile._id,
            })
            await newsubmission.save();
        }
        else{
            await cloudinary.uploader.destroy(result.publicId);
            res.status(400).json({error: "file not uploaded"});
        }
        res.status(200).json({message: "file upload successfully"});
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal server Error uploading file');
    }
}