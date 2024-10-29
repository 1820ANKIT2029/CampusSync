import {Event} from "../models/event.model.js";
import { Task } from "../models/task.models.js";

export const createEvent = async (req,res,next) => {
    const {
        name,
        description,
        startTime,
        endTime,
        location,
        organizer
    } = req.body;

    try{
        const existance = await Event.findOne({organizer});
        
        if(existance){
            return res.status(409).json({error: "event already present"});
        }

        const newEvent = new Event({
            name,
            description,
            startTime,
            endTime,
            location,
            organizer
        });

        const event = await newEvent.save();

        return res.status(200).json({message: "event created"});
    }catch(error){
        return res.status(500).json({error:"Internal server error in createEvent"});
    }
}

export const removeEvent = async (req,res,next) => {
    const { id } = req.params;

    try{
        const exist = Event.findById(id);

        if(!exist){
            return res.status(404).json({error: "task doesn't exist"});
        }

        await Event.findByIdAndDelete(id);
        await Task.deleteMany({eventId: id});
        
        return res.status(200).json({message: "event deleted successively."});
    }catch{error}{
        return res.status(500).json({error:"Internal server error in removeEvent"});
    }
}
