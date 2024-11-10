import { table } from "console";
import { Event, EventParticipant } from "../models/event.model.js";
import { News } from "../models/news.model.js";
import { Submission } from "../models/submission.model.js";
import { Task, TaskParticipant } from "../models/task.models.js";
import { Profile } from "../models/user.models.js";

export const adminEvents = async (req, res, next) => {
    const id = req.user.id;

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const event = await Event.find({organizer: profile._id});

        if(!event){
            return res.status(400).json({error : "No event"});
        }

        return res.status(200).json(event);
    }catch(err){
        return res.status(500).json({error : "Internal server error at admin Events"});
    }
};

export const adminEventById = async (req, res, next) => {
    const { eventId } = req.params;
    const id = req.user.id;

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const event = await Event.findOne({
            _id: eventId,
            organizer: profile._id
        });
        if(!event){
            return res.status(400).json({error : "no eventID exist for admin"});
        }

        const eventParticipant = await EventParticipant.find({eventId: eventId});

        const task = await Task.find({eventId: eventId});
        let SubmissionObject = [];
        for(let i=0; i<task.length; i++){
            const submission = await Submission.find({taskId: task[i]._id}).populate('fileId participantId taskId');
            for(const x of submission){
                SubmissionObject.push(x)
            }
        }

        return res.status(200).json({
            "event": event,
            "eventParticipants": eventParticipant,
            "tasks": task,
            "submissions": SubmissionObject
        });

    }catch(err){
        return res.status(500).json({error : "Internal server error at admin Event details by eventId"});
    }
};

export const adminActiveEvents = async (req, res, next) => {
    const id = req.user.id;
    const now = new Date();

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const event = await Event.find({
            startTime: { $lte: now },
            endTime: { $gte: now },
            organizer: profile._id
        });

        if(!event){
            return res.status(400).json({error : "No event"});
        }

        return res.status(200).json(event);
    }catch(err){
        return res.status(500).json({error : "Internal server error at admin Events"});
    }
};

export const adminInactiveEvents = async (req, res, next) => {
    const id = req.user.id;
    const now = new Date();

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const event = await Event.find({
            endTime: { $lte: now },
            organizer: profile._id
        });

        if(!event){
            return res.status(400).json({error : "No event"});
        }

        return res.status(200).json(event);
    }catch(err){
        return res.status(500).json({error : "Internal server error at admin Events"});
    }
};

export const adminNews = async (req, res, next) => {
    const id = req.user.id;

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const news = await News.find({adminId: profile._id});

        if(!news){
            return res.status(400).json({error: "News  does not exist"});
        }

        return res.status(200).json(news);
    }catch(err){
        return res.status(500).json({error : "Internal server error at admin News"});
    }
};

export const adminNewsById = async (req, res, next) => {
    const id = req.user.id;
    const { newsId } = req.params;

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const news = await News.findOne({adminId: profile._id, _id: newsId});

        if(!news){
            return res.status(400).json({error: "Admin news does not exist with given ID"});
        }

        return res.status(200).json(news);
    }catch(err){
        return res.status(500).json({error : "Internal server error at admin News"});
    }
};

export const getStats = async (req, res, next) => {
    const id = req.user.id;

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');

        if(!profile){
            return res.status(400).json({error: "Admin doesn't exist"});
        }

        var totalParticipants = 0;
        var totalEvents = 0;
        var totalBlogs = 0;
        const events = await Event.find({organizer:profile._id});
        console.log(events);
        for(const event of events){
            totalParticipants += await EventParticipant.countDocuments({ eventId: event._id });
        }

        totalBlogs = await News.countDocuments({adminId:profile._id});
        totalEvents = events.length;
        
        return res.status(200).json({totalEvents,totalParticipants,totalBlogs});
       
    }catch(err){
        return res.status(500).json({error : "Internal server error at admin News"});
    }
};

