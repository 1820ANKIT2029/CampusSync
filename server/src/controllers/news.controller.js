import { News } from "../models/news.model.js";
import { Profile } from "../models/user.models.js";

export const addNews = async (req,res,next) => {
    const { adminId, headline, description, date } = req.body;

    try{
        const exist = await News.findOne({adminId,headline,date});
        if(exist){
            res.status(400).json({error: "News already exist"});
        }

        const newNews = new News({
            adminId,
            headline,
            description,
            date,
        })

        await newNews.save();

        return res.status(200).json({message: "news created"});
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal Server Error in addNews"});
    }
}

export const removeNews = async (req,res,next) => {
    const {_id, adminId} = req.body;
    
    try{
        const news = await news.findById({_id});

        if(!news){
            res.status(404).json({error: "news not found"});
        }

        if(news.adminId != adminId){
            res.status(404).json({error: "you are not authorized to delete the news"});
        }

        await News.deleteOne({_id});
        
        res.status(200).json({message: "news deleted!"});
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
        return res.status(204).json({message: "News updated successfully"});
    }catch(err){
        res.status(500).json({error: "Internal server error found in edit news"});
    }
}