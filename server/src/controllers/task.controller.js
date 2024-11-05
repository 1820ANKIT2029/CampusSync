import { Task, SUBMISSION_TYPE } from "../models/task.models.js";
import { Event } from "../models/event.model.js";
import { Profile } from "../models/user.models.js";

export const createTask = async (req,res,next) => {
    const {
        eventId ,
        name,
        description,
        submissionType,
        dueDate,
    }  = req.body;

    if(!(eventId && name && description && submissionType && dueDate)){
        return res.status(400).json({error: "Invalid task form"});
    }

    if(!SUBMISSION_TYPE.includes(submissionType)){
        return res.status(400).json({error: "Invalid submission type"});
    }

    try{
        const eventexist = await Event.findById(eventId);
        if(!eventexist){
            return res.status(400).json({error: "Event with given EventId does not exist"});
        }

        const DueDate = new Date(dueDate);

        if((!(DueDate > eventexist.startTime) && (DueDate < eventexist.endTime))){
            return res.status(400).json({error: "Due date must be between Start Time and End Time of the Event"});
        }

        const exist = await Task.findOne({name, eventId});

        if(exist){
            return res.status(409).json({error: `task already present with ${name} name`});
        }

        const newTask = new Task({
            eventId ,
            name,
            description,
            submissionType,
            dueDate: DueDate,
        })

        const task = newTask.save();

        return res.status(200).json({message: "task created"});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Internal server error in createTask."});
    }
}

export const removeTask = async (req,res,next) => {
    const {
        taskId
    } = req.query;

    const id = req.user.id;

    if(!taskId){
        return res.status(400).json({error: "need Task ID"});
    }

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const taskexist = await Task.findOne({_id: taskId});

        if(!taskexist){
            return res.status(404).json({error: "task not found"});
        }

        const eventexist = await Event.findOne({
            _id: taskexist.eventId,
            organizer: profile._id
        });

        if(!eventexist){
            return res.status(400).json({error: "Given Task does not belong to your event"});
        }

        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({error: "task deleted successfully"});
    }catch(error){
        return res.status(500).json({error: "Internal server error in remove task."})
    }
}