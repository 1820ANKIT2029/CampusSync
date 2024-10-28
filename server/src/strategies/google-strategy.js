import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import models from '../models/user.models.js'; // Adjust the path
const { User, Profile, Image } = models;
import dotenv from 'dotenv';

dotenv.config();
// Configure serialization
passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        return done(err, null);
    }
});

// Set up Google OAuth strategy
passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,    
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Extract email from the Google profile
                const email = profile.emails[0].value;
                let findUser = await User.findOne({ email });
                
                if (!findUser) {
                    const newUser = new User({
                        username: profile.id,
                        email: email,
                        password: "Google",
                    });
                    const newSavedUser = await newUser.save();
                    return done(null, newSavedUser);
                }
                
                return done(null, findUser);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
