import { Profile } from "../models/user.models.js"
import { error } from "./auth.controller.js";

export const profile = async (req, res, next) => {
    const result = await Profile.findOne({userid: req.user.id});

    if(!result){
        return res.status(404).json({error: "user not found"});
    }

    return res.status(200).json(result);
}