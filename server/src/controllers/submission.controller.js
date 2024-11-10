import { v2 as cloudinary } from 'cloudinary';

import { File } from "../models/file.model.js";
import { Task, TaskParticipant } from '../models/task.models.js';
import { Submission } from "../models/submission.model.js";
import { getResourceType } from "../util/helper.js"
import { Event, EventParticipant } from '../models/event.model.js';
import { Profile } from '../models/user.models.js';
import { History } from '../models/history.model.js';
import { addNotification } from './notification.controller.js';

export const upload = async (req, res, next) => {
    const file = req.file;
    const id = req.user.id;
    const { taskId } = req.query;
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

        const newfile = new File({
            cloudId: result.public_id,
            filename: file.originalname,
            url: result.secure_url,
            type: file.mimetype,
            size: file.size
        });

        if(newfile){
            await newfile.save();

            const profile = await Profile.findOne({userid: id}).select('_id');
            const task = await Task.findById(taskId).select('name');

            const newsubmission = new Submission({
                participantId: profile._id,
                taskId: taskId,
                fileId: newfile._id,
            })
            await newsubmission.save();
            addNotification(profile._id, `Your Submmission for ${task.name}`);
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
    const id  = req.user.id;

    if(!submissionId){
        return res.status(400).json({error: "Submission ID not provided."});
    }

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
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
            {participantId: submission.participantId},
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

        // notification part
        addNotification(submission.participantId, `Your submission for task ${task.name} is Verified by the event admin`);
        
        return res.status(200).json({message : "submission verify done"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal server error at verifySubmission"});
    }
}

export const InvalidSubmission = async (req, res, next) => {
    const { submissionId } = req.params;
    const id = req.user.id;

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
            {participantId: submission.participantId},
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
        addNotification(participant.participantId, `Your submission for task ${task.name} is rejected by the event admin`);
        return res.status(200).json({message : "submission remove verify done"});
    }catch(error){
        return res.status(500).json({error: "Internal server error at removeVerifysubmission"});
    }
}