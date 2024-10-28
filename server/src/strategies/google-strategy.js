import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user.models";

// Configure serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        done(err, null);
    }
});

// Set up Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/redirect",
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
