import { v2 as cloudinary } from 'cloudinary';

import { uploadstorage } from "../middleware/upload.js";
import { EventParticipant } from "../models/event.model.js";
import { Task, TaskParticipant } from "../models/task.models.js";
import { Profile } from "../models/user.models.js";
import { GENDER, YEAR } from "../models/user.models.js";


export const profile = async (req, res, next) => {
    const result = await Profile.findOne({userid: req.user.id});

    if(!result){
        return res.status(404).json({error: "user not found"});
    }

    return res.status(200).json(result);
}

export const handleImageUpload = uploadstorage.single('profilePic');

// export const handleImageUpload = async (req, res, next) => {
//     const { profilePic } = req.body
//     if(profilePic){
//         uploadstorage.single('profilePic');
//     }
//     next();
// }

export const profileEdit = async (req, res, next) => {
    const { name, year, branch, email, bio, profilePic } = req.body;

    let changes = {}

    if(name){
        changes.name = name;
    }
    if(year){
        if(!YEAR.includes(Number(year))){
            return res.status(400).json({error: "invalid Year"});
        }
        changes.year = Number(year);
    }
    if(branch){
        changes.branch = branch;
    }
    if(email){
        changes.email = email;
    }
    if(bio){
        changes.bio = bio;
    }
    if(req.file){
        if(Number(req.file.size) > 1000000){
            return res.status(400).json({error: "image size must be less than 1MB"});
        }
        if(!req.file.mimetype.startsWith('image/')){
            return res.status(400).json({error: "invalid image file"});
        }

        const cloudupload = await cloudinary.uploader.upload(req.file.path, 
            { resource_type: 'image' }
        );

        changes.profilePic = cloudupload.secure_url;
    }

    try{
        const updateprofile = await Profile.findOneAndUpdate(
            {userid: req.user.id},
            changes, 
            { new: true }
        );
        if(!updateprofile){
            return res.status(400).json({error: "profile update error"});
        }
        return res.status(200).json(updateprofile);
    }catch(err){
        return res.status(500).json({ error: "Internal server error at profile edit" });
    }

}

export const event = async (req, res, next) => {
    const id = req.user.id;
    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const result = await EventParticipant.find({participantId: profile._id}).populate('eventId');
        if(!result){
            return res.status(404).json({error: "unable to fetch events"});
        }
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json({ error: "Internal server error at user events" });
    }
}

export const ActiveEvent = async (req, res, next) => {
    const userId = req.user.id;
    const now = new Date();

    try {
        const profile = await Profile.findOne({userid: userId}).select("_id");
        const activeEvents = await Event.find({
            startTime: { $lte: now },
            endTime: { $gte: now }
        }).select('_id');

        if(!(profile && activeEvents)){
            return res.status(404).json({error: "unable to fetch ActiveEvent 1"});
        }

        const activeEventIds = activeEvents.map(event => event._id);
        const result = await EventParticipant.find({
            participantId: profile._id,
            eventId: { $in: activeEventIds }
        }).populate('eventId');

        if(!result){
            return res.status(404).json({error: "unable to fetch ActiveEvent 2"});
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error at user active events" });
    }
}

export const InactiveEvent = async (req, res, next) => {
    const userId = req.user.id;
    const now = new Date();

    try {
        const profile = await Profile.findOne({userid: userId}).select("_id");
        const activeEvents = await Event.find({
            endTime: { $lte: now }
        }).select('_id');

        if(!(profile && activeEvents)){
            return res.status(404).json({error: "unable to fetch InActiveEvent 1"});
        }

        const activeEventIds = activeEvents.map(event => event._id);
        const result = await EventParticipant.find({
            participantId: profile._id,
            eventId: { $in: activeEventIds }
        }).populate('eventId');

        if(!result){
            return res.status(404).json({error: "unable to fetch InActiveEvent 2"});
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error at user inactive events" });
    }
}

export const registerInEvent = async (req, res, next) => {
    const { eventId } = req.params;
    const id = req.user.id;

    try{
        const eventexist = await Event.findById(eventId).select('_id');
        if(!eventexist){
            return res.status(400).json({error: "Event do not exist"});
        }
        const profile = await Profile.findOne({userid: id}).select('_id');
        const participant = new EventParticipant({
            "eventId": eventId,
            "participantId": profile._id
        });

        if(profile || participant){
            return res.status(400).json({error: "Profile or EventParticipant error"});
        }

        await participant.save();
        res.status(201).json({message: "registered successfully", result: participant});
    }catch(err){
        return res.status(500).json({error: "Internal server error at registerEvent"});
    }
}

export const registerInTask = async (req, res, next) => {
    const { taskId } = req.params;
    const id = req.user.id;

    try{
        const taskexist = await Task.findById(taskId).select('_id');
        if(!taskexist){
            return res.status(400).json({error: "Task do not exist"});
        }

        const profile = await Profile.findOne({userid: id}).select('_id');
        const participant = new TaskParticipant({
            "taskId": taskId,
            "participantId": profile._id
        });

        if(!(profile && participant)){
            return res.status(400).json({error: "Profile or TaskParticipant error"});
        }

        await participant.save();
        res.status(201).json({message: "registered successfully", result: participant});
    }catch(err){
        return res.status(500).json({error: "Internal server error at registerEvent"});
    }
}