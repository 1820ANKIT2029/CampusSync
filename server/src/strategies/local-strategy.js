import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.models";

// Configure passport serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

// Implement the local strategy
passport.use(
    new LocalStrategy(
        { usernameField: "username", passwordField: "password" },
        async (username, password, done) => {
            try {
                let findUser = await User.findOne({ username });
                
                // If user doesn't exist, create a new user
                if (!findUser) {
                    const newUser = new User({
                        username,
                        email: username,  // assuming `username` is an email
                        password: password  // ideally, hash this before saving
                    });
                    const newSavedUser = await newUser.save();
                    return done(null, newSavedUser);
                }
                
                // User found
                return done(null, findUser);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

export default passport;
