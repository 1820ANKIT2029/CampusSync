import { profile } from "../controllers/user.controller";
import { Profile } from "../models/user.models.js";

// user authenticated then redirect to next page
export const ensureLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.status(401).json({error: "not logged in"});
    }
};

// ensuring the user is logged out(used while going to login page)
export const ensureLoggedOut = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        return res.status(401).json({error: "already logged in"});
    }
};

export const ensureAdmin = async (req, res, next) => {
    try{
        const profile = await Profile.findOne({userid: req.user.id}).select('isAdmin');
        if(profile.isAdmin){
            next();
        }
        else{
            return res.status(401).json({error: "No admin access"});
        }
    }catch(err){
        return res.status(500).json({error: "Internal server error at ensure admin"});
    }
};

export const ensureUser = async (req, res, next) => {
    try{
        const profile = await Profile.findOne({userid: req.user.id}).select('isAdmin');
        if(!profile.isAdmin){
            next();
        }
        else{
            return res.status(401).json({error: "No User access"});
        }
    }catch(err){
        return res.status(500).json({error: "Internal server error at ensure admin"});
    }
};
