import { Event } from "../models/event.model.js";
import { Task } from "../models/task.models.js";
import { Profile } from "../models/user.models.js";

export const createEvent = async (req,res,next) => {
    const {
        name,
        description,
        startTime,
        endTime,
        location
    } = req.body;
    const id = req.user.id;

    if(!(name && description && startTime && endTime && location)){
        return res.status(400).json({error: "Invalid Event form values"});
    }

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const existance = await Event.findOne({organizer: profile._id, name:name});
        
        if(existance){
            return res.status(409).json({error: "event already present"});
        }

        const newEvent = new Event({
            name,
            description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            location,
            organizer : profile._id
        });

        const event = await newEvent.save();

        return res.status(200).json({message: "event created",eventId:event._id});
    }catch(error){
        return res.status(500).json({error:"Internal server error in createEvent"});
    }
}

export const removeEvent = async (req,res,next) => {
    const { EventId } = req.query;

    const id = req.user.id;

    if(!EventId){
        return res.status(400).json({error: "need event ID"});
    }

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const exist = Event.findOne({_id:EventId, organizer: profile._id});

        if(!exist){
            return res.status(404).json({error: "task doesn't exist"});
        }

        await Event.findByIdAndDelete(EventId);
        await Task.deleteMany({eventId: EventId});
        
        return res.status(200).json({message: "event deleted successively."});
    }catch{error}{
        return res.status(500).json({error:"Internal server error in removeEvent"});
    }
}
