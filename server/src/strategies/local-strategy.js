import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.models";
import {hashPassword,comparePassword} from "../util/hash_function";

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
                        password: hashPassword(password),
                    });
                    const newSavedUser = await newUser.save();
                    return done(null, newSavedUser);
                }
                
                // User found
                if(comparePassword(password,findUser.password)){
                    req.session.user = findUser;
                    return done(null, findUser);
                }
                else{
                    return done({error: "Password Don't matched"},null)
                }
                
            } catch (err) {
                done(err, null);
            }
        }
    )
);

export default passport;
