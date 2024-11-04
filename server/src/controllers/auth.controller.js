import passport from 'passport';

import { User, Profile } from '../models/user.models.js';
import { hashPassword } from "../util/hash_function.js";

export const loginV1 =  passport.authenticate("local")

export const signupV1 = async (req, res, next) => {
    const {username,password,confirmPassword,email, isAdmin} = req.body;

    try{
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: "User already exists"});
        }

        if(password.length < 6){
            return res.status(400).json({error: "password length must be atleast 6"});
        }

        if(password != confirmPassword){
            return res.status(400).json({error: "Password doesn't match"});
        }

        const hashedPassword =  await hashPassword(password)

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        })

        if(newUser){
            await newUser.save();
            
            const newprofile = new Profile({
                userid: newUser._id,
                email: email,
                isAdmin: (isAdmin==='true')?true:false
            })

            const new_profile = await newprofile.save();

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
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal server error in signupv1"});
    }
}

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email']})

export const googleLoginafter = (req, res, next) => {
        if(req.user){
            res.status(400).json({error: "Invalid User!"});
        }else{
            res.status(200).json({message: "valid User!"});
        }
}

export const googlecallback = passport.authenticate('google',
    { 
        successRedirect: "http://localhost:5173/home",
        failureRedirect: "http://localhost:5173/login",
    }
);

export const logout = async (req, res, next) => {
    if(req.isAuthenticated()){
        await req.logout(async function (err) {
            if (err) {
              return next(err);
            }
            await req.session.destroy(() => {
              res.clearCookie("connect.sid"); // Clear session cookie (optional)
              res.status(200).json({message: "logout successfully"});
            });
        });
    }
    else{
        res.status(401).json({error: "already logout"});
    }
    
  }

export const success = (req, res, next) => {
    res.status(200).json(
        {
            message: `Login successful! Welcome ${req.user.username}`
        }
    );
}

export const error = (req, res, next) => {
    res.status(400).json(
        {
            error: `Login failed! Please try again.`
        }
    );
}
