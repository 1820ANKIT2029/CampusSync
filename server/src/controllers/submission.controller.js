import { v2 as cloudinary } from 'cloudinary';

import { File } from "../models/file.model.js";
import { Task, TaskParticipant } from '../models/task.models.js';
import { Submission } from "../models/submission.model.js";
import { getResourceType } from "../util/helper.js"

export const upload = async (req, res, next) => {
    const file = req.file;
    const { taskId, userId } = req.query;
    const resource_type = getResourceType(file);

    try {
        const taskexist = await Task.findById(taskId).select('_id');
        if(!taskexist){
            return res.status(400).json({error: "Task do not exist"});
        }

        let result;
        if(resource_type === 'raw'){
            result = await cloudinary.uploader.upload(file.path, 
                {
                    resource_type: "raw",
                    type: "authenticated",
                    sign_url: true,
                    api_secret: process.env.CLOUDINARY_API_SECRET
                }
            );
        }
        else{
            result = await cloudinary.uploader.upload(file.path, 
                { resource_type: resource_type }
            );
        }
        
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
            return res.status(400).json({error: "file not uploaded"});
        }
        return res.status(200).json({message: "file upload successfully"});
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).send('Internal server Error uploading file');
    }
}

export const verifySubmission = async (req, res, next) => {
    const { submissionId } = req.params;
    const { IsAccept } = req.body;
    const { id } = req.user.id;

    if (typeof(IsAccept) !== 'boolean') {
        return res.status(400).json({ error: "isAccept must be a boolean." });
    }

    try{
        const submissionexist = await Submission.findById(submissionId);
        if(!submissionexist){
            return res.status(400).json({error: "Submission does not exist"});
        }

        if(submissionexist.isCheck){
            return res.status(429).json({error: "Already done"});
        }

        const submission = await Submission.findByIdAndUpdate(
            submissionId,
            { 'isCheck': true },
            { new: true }
        );
        const task = await TaskParticipant.findOneAndUpdate(
            {TaskParticipant: submission.participantId},
            {isCompleted: IsAccept},
            { new: true }
        );

        if(!(submission && task)){
            return res.status(400).json({error: "Submission or Task update error"});
        }

        return res.status(200).json({message : "submission verify done"});
    }
    catch(err){
        return res.status(500).json({error: "Internal server error at verifySubmission"});
    }
}