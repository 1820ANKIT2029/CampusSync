import GoogleStrategy from "passport-google-oauth2";
import {User, Profile} from '../models/user.models.js';
import dotenv from 'dotenv';

dotenv.config();

// Set up Google OAuth strategy
const googlestrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,    
        scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Extract email from the Google profile
            // if (profile.domain !== process.env.COLLEGE_DOMAIN) {
            //     return done(null, false, { message: "Unauthorized domain" });
            // }
            const email = profile.emails[0].value;
            let findUser = await User.findOne({ email });
            
            if (!findUser) {
                const newUser = new User({
                    username: profile.id,
                    email: email,
                    password: "Google",
                });
                const newSavedUser = await newUser.save();

                const newprofile = new Profile({
                    userid: newUser._id,
                    name: profile.displayName,
                    profilePic: profile.photos[0].value,
                    email,
                })

                const new_profile = await newprofile.save();
                return done(null, newSavedUser);
            }
            
            return done(null, findUser);
        } catch (err) {
            return done(err, null);
        }
    }
);


export default googlestrategy;
