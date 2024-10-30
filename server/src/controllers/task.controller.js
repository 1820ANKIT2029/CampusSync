import {Task} from "../models/task.models.js";

export const createTask = async (req,res,next) => {
    const {
        eventId ,
        name,
        description,
        submissionType,
        dueDate,
    }  = req.body;

    try{
        const exist = await Task.findOne({name,eventId});

        if(exist){
            return res.status(409).json({error: "task already present"});
        }

        const newTask = new Task({
            eventId ,
            name,
            description,
            submissionType,
            dueDate,
        })

        const task = newTask.save();

        return res.status(200).json({message: "task created"});
    }catch(error){
        return res.status(500).json({error:"Internal server error in createTask."});
    }
}

export const removeTask = async (req,res,next) => {
    const {
        id
    } = req.query;
    console.log(id);

    try{
        const exist = Task.findById({_id:id});

        if(!exist){
            return res.status(404).json({error: "task not found"});
        }

        console.log(exist.toString());

        await Task.findByIdAndDelete({_id: id});
        return res.status(200).json({error: "task deleted successively"});
    }catch(error){
        return res.status(500).json({error: "Internal server error in remove task."})
    }
}