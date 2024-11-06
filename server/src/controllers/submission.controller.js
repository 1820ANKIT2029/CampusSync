import { v2 as cloudinary } from 'cloudinary';

import { File } from "../models/file.model.js";
import { Task, TaskParticipant } from '../models/task.models.js';
import { Submission } from "../models/submission.model.js";
import { getResourceType } from "../util/helper.js"
import { Event, EventParticipant } from '../models/event.model.js';
import { Profile } from '../models/user.models.js';

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
            url: result.secure_url,
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

export const ValidSubmission = async (req, res, next) => {
    const { submissionId } = req.params;
    const { id } = req.user.id;

    if(!submissionId){
        return res.status(400).json({error: "Submission ID not provided."});
    }

    try{
        const profile = await Profile.findOne({userId: id}).select('_id');
        const submissionexist = await Submission.findById(submissionId).populate('taskId');
        if(!submissionexist){
            return res.status(400).json({error: "Submission does not exist"});
        }

        const isadminevent = await Event.findOne({
            _id: submissionexist.taskId.eventId,
            organizer: profile._id
        });
        if(!isadminevent){
            return res.status(400).json({error: "submission does not belong to your event"});
        }

        if(submissionexist.isCheck){
            return res.status(400).json({error: "Already done"});
        }

        const submission = await Submission.findByIdAndUpdate(
            submissionId,
            { 'isCheck': true },
            { new: true }
        );
        const task = await TaskParticipant.findOneAndUpdate(
            {TaskParticipant: submission.participantId},
            {isCompleted: true},
            {new: true }
        );
        if(!(submission && task)){
            return res.status(400).json({error: "Submission or Task update error"});
        }
        const event = await EventParticipant.findOneAndUpdate(
            {eventId: submissionexist.taskId.eventId},
            { $inc: { points: 10 } },
            { new: true }     
        );
        return res.status(200).json({message : "submission verify done"});
    }
    catch(err){
        return res.status(500).json({error: "Internal server error at verifySubmission"});
    }
}

export const InvalidSubmission = async (req, res, next) => {
    const { submissionId } = req.params;
    const { id } = req.user.id;

    if(!submissionId){
        return res.status(400).json({error: "Submission ID not provided."});
    }

    try{
        const profile = await Profile.findOne({userId: id}).select('_id');
        const submissionexist = await Submission.findById(submissionId).populate('taskId');
        if(!submissionexist){
            return res.status(400).json({error: "Submission does not exist"});
        }

        const isadminevent = await Event.findOne({
            _id: submissionexist.taskId.eventId,
            organizer: profile._id
        });
        if(!isadminevent){
            return res.status(400).json({error: "submission does not belong to your event"});
        }

        if(!submissionexist.isCheck){
            return res.status(400).json({error: "Already done"});
        }

        const submission = await Submission.findByIdAndUpdate(
            submissionId,
            { 'isCheck': true },
            { new: true }
        );
        const task = await TaskParticipant.findOneAndUpdate(
            {TaskParticipant: submission.participantId},
            {isCompleted: false},
            {new: true }
        );
        if(!(submission && task)){
            return res.status(400).json({error: "Submission or Task update error"});
        }
        const event = await EventParticipant.findOneAndUpdate(
            {eventId: submissionexist.taskId.eventId},
            { $inc: { points: -10 } },
            { new: true }     
        );
        return res.status(200).json({message : "submission remove verify done"});
    }catch(error){
        return res.status(500).json({error: "Internal server error at removeVerifysubmission"});
    }
}