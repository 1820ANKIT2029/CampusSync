import { News } from "../models/news.model.js"
import { Event, EventParticipant } from "../models/event.model.js"
import { Task } from "../models/task.models.js";
import { Profile } from "../models/user.models.js";
import { Comment } from "../models/comment.model.js";
import { Submission } from "../models/submission.model.js";

export const getevents = async (req, res, next) => {
    const { name, isActive, startTime, endTime, organizer } = req.query;

    let id;
    try{
        id = req.user.id;
    }catch(err){
        console.log(err);
        return ;
    }

    let filter = {};

    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }
    if (startTime) {
        filter.startTime = { $gte: new Date(startTime) };
    }
    if (endTime) {
        filter.endTime = { $lte: new Date(endTime) };
    }
    if (organizer) {
        filter.organizer = organizer;
    }

    if (isActive === 'true') {
        const now = new Date();
        filter.startTime = { $lte: now };
        filter.endTime = { $gte: now };
    }

    try {
        let profile, userevent;
        if(id){
            profile = await Profile.findOne({userid: id}).select('_id');
            userevent = await EventParticipant.find({participantId: profile._id}).select('eventId');
            const participatedEventIds = userevent.map(event => event.eventId);
            filter._id = { $nin: participatedEventIds };
        }
        const events = await Event.find(filter)
        .sort({createdAt: -1})
        .limit(30)
        .populate("organizer", "name bio profilePic");
        if(!events){
            return res.status(404).json({error: "unable to fetch events"});
        }

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Internal server error at getevents" });
    }

};

// date and author based filtering 
export const getnews = async (req, res, next) => {
    const { date , author } = req.query;
    const { num } = req.params;

    let filter = {};
    
    if(date){
        filter.date = new Date(date);
    }
    if(author){
        filter.adminId = author;
    }

    try{
        const result = await News.find(filter)
        .sort({createdAt: -1})
        .skip((Number(num)-1)*10)
        .limit(10)
        .populate('adminId', 'profilePic name bio');

        if(!result){
            return res.status(404).json({error: "unable to fetch news"});
        }

        if(result.length == 0){
            return res.status(503).json({error: `No data for ${date}, ${author} and num:${num}`});
        }

        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json({error: "Internal server error at getnews"});
    }
    
};

export const getnewss = async (req, res, next) => {
    try {
        const result = await News
                            .find({})
                            .sort({ _id: -1 }) // Sort by most recent entries if needed
                            .limit(10); // No need for toArray with Mongoose

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "No news data available" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error at getnewss" });
    }
};

export const comment = async (req, res, next) => {
    const id = req.user.id;
    const { eventId } = req.query;
    if (!eventId) return res.status(404).json({error: "eventId not included in the query"});
    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const result = await Comment.find({"eventId": eventId}).populate('userId', "_id name profilePic");
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json({ error: "Internal server error at Comment" });
    }
}


export const eventinfo = async (req, res, next) => {
    const { eventId } = req.query;

    let id;
    if(req.user.id){
        id = req.user.id;
    }
    console.log("user id", id)

    if(!eventId){
        return res.status(400).json({error: "usage: /api/eventinfo?eventId={id}"});
    }

    try{
        const profile = await Profile.findOne({userid: id._id}).select('_id');
        const event = await Event.findById(eventId).populate('organizer', "name profilePic bio");

        if(!event){
            return res.status(400).json({error: "No event exist with given eventId"});
        }

        const task = await Task.find({ eventId: eventId });
        let submission = [];

        if (id) {
            for (let t of task) {
                const s = await Submission.findOne({ participantId: profile._id, taskId: t._id });
                if(s){
                    submission.push(s);
                }
            }
        }

        let data = {"event": event, "task": task};
        if(id){
            data["submission"] = submission;
        }
        return res.status(200).json(data);
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Interval server error at eventinfo"});
    }
}

export const NewsById = async (req, res, next) => {
    const { newsId } = req.params;

    try{
        const news = await News.findById(newsId);

        if(!news){
            return res.status(400).json({error: "Admin news does not exist with given ID"});
        }

        return res.status(200).json(news);
    }catch(err){
        return res.status(500).json({error : "Internal server error at api get News by Id"});
    }
};