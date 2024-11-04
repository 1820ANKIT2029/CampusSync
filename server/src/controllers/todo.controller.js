import { Todo } from "../models/todo.model.js";
import { Profile } from "../models/user.models.js";

export const todolist = async (req, res, next) => {
    const id = req.user.id;

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const todo = await Todo.find({profileId: profile._id});
        if(!(profile && todo)){
            return res.status(400).json({error: "error in todolist cosntroller"});
        }
        return res.status(200).json(todo);

    }catch(err){
        return res.status(500).json({error: "Internal server error in todolist."}) 
    }
}

export const todo = async (req, res, next) => {
    const { todoId } = req.params;

    try{
        const task = await Todo.findById(todoId);
        if(!task){
            return res.status(400).json({error: "Todo does not exist with this todoId"});
        }
        return res.status(200).json(task);
    }catch(err){
        return res.status(500).json({error: "Internal server error in todo."}) 
    }

}
export const todoadd = async (req, res, next) => {
    const {topic , description, dueDate } = req.body;
    const date = new Date(dueDate);
    try{
        const todo = new Todo({
            "topic": topic,
            "description": description,
            dueDate: date
        }).save();

        if(todo){
            return res.status(200).json({message: "todo created"});  
        }
        else{
            return res.status(400).json({error: "failed to save todo"});
        }

    }catch(err){
        return res.status(500).json({error: "Internal server error at todo add."}) 
    }
}
export const tododone = async (req, res, next) => {
    const { todoId } = req.params;

    try{
        const task = await Todo.findByIdAndUpdate(todoId, {isCompleted: true}, {new: true});
        if(task){
            return res.status(204).json({message: "todo updated"});
        }
        else{
            return res.status(400).json({error: "task does not exist"});
        }
    }catch{
        return res.status(500).json({error: "Internal server error at todo done."}) 
    }
}

export const tododelete = async (req, res, next) => {
    const { todoId } = req.params;

    try{
        const task = await Todo.findByIdAndDelete(todoId);

        if (!task) {
            return res.status(400).json({message: 'Todo not found or already deleted'});
        } else {
            return res.status(204).json({message: "Deleted Todo"});
        }
    }catch{
        return res.status(500).json({error: "Internal server error at todo delete."}) 
    }
}
