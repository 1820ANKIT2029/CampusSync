import { News } from "../models/news.model.js";
import { Profile } from "../models/user.models.js";
import { addNotification } from "./notification.controller.js";

export const addNews = async (req,res,next) => {
    const { headline, description, date } = req.body;
    const id = req.user.id;

    if(!(headline && description && date)){
        return res.status(400).json({error: " headline, description, date are not provided"});
    }

    const DATE = new Date(date);

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const exist = await News.findOne({
            adminId: profile._id,
            headline: headline
        });
        if(exist){
            res.status(400).json({error: "News already exist"});
        }

        const newNews = new News({
            adminId: profile._id,
            headline,
            description,
            date: DATE,
        })

        await newNews.save();

        addNotification(profile._id, `${headline} added to news section`);

        return res.status(200).json({message: "news created"});
    }catch(error){
        res.status(500).json({error: "Internal Server Error in addNews"});
    }
}

export const removeNews = async (req, res, next) => {
    const { newsId } = req.params;
    const id = req.user.id;
    
    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const result = await News.deleteOne({
                _id: newsId,
                adminId: profile._id
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "News not found" });
        }

        res.status(200).json({ message: "News deleted successfully" });
    }catch(error){
        res.status(500).json({error: "Internal server error found in removeNews"});
    }
}

export const EditNews = async (req, res, next) => {
    const { newsId } = req.params;
    const { headline, description } = req.body;
    const id = req.user.id;
    let changes = {};

    if(headline){
        changes.headline = headline;
    }
    if(description){
        changes.description = description;
    }

    try{
        const profile = await Profile.findOne({userid: id}).select('_id');
        const news = await News.findOneAndUpdate(
            {adminId: profile._id, _id: newsId},
            changes,
            {new: true}
        );
        if(!news){
            return res.status(400).json({error: "News update failed"});
        }
        return res.status(200).json({message: "News updated successfully"});
    }catch(err){
        res.status(500).json({error: "Internal server error found in edit news"});
    }
}