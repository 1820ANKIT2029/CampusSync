import { EventParticipant } from "../models/event.model.js";
import { Profile } from "../models/user.models.js"
import { error } from "./auth.controller.js";

export const profile = async (req, res, next) => {
    const result = await Profile.findOne({userid: req.user.id});

    if(!result){
        return res.status(404).json({error: "user not found"});
    }

    return res.status(200).json(result);
}

export const event = async (req, res, next) => {
    const id = req.user.id;
    try{
        const profile = await Profile.findOne({userid: id});
        const result = await EventParticipant.find({participantId: profile._id}).populate('eventId');
        if(!result){
            return res.status(404).json({error: "unable to fetch events"});
        }
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json({ error: "Internal server error at user events" });
    }
}