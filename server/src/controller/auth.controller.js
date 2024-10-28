import models from '../models/user.models.js'; // Adjust the path
const { User, Profile, Image } = models;
import {hashPassword,comparePassword} from "../util/hash_function.js"

export const signupV1 = async (req, res, next) => {
    const {username,password,confirmPassword,email} = req.body;

    const user = await User.findOne({username});

    if(user){
        return res.send(400).json({error: "User already exists"});
    }

    if(password != confirmPassword){
        return res.status(400).json({error: "Password doesn't match"});
    }

    const newUser = new User({
        username,
        password: hashPassword(password),
        email,
    })

    if(newUser){
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            username,
            email,
        })
    }
    else{
        res.status(400).json({error: "Invalid User Data"});
    }
}