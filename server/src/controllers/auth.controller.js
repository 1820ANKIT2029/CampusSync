import passport from 'passport';

import { User, Profile } from '../models/user.models.js';
import { hashPassword } from "../util/hash_function.js";

export const loginV1 =  passport.authenticate("local", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/error",
  })

export const signupV1 = async (req, res, next) => {
    const {username,password,confirmPassword,email} = req.body;

    const user = await User.findOne({username});

    if(user){
        return res.status(400).json({error: "User already exists"});
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

        const newprofile = new Profile({
            userid: newUser._id,
            email,
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
        successRedirect: '/auth/success',
        failureRedirect: '/auth/error'
    }
);

export const logout = (req, res, next) => {
    if(req.isAuthenticated()){
        req.logout(function (err) {
            if (err) {
              return next(err);
            }
            req.session.destroy(() => {
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
            message: `Login successful! Welcome ${req.user.email}`
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
