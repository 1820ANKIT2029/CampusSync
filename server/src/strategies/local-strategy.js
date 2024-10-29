import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.models.js";
import { hashPassword, comparePassword } from "../util/hash_function.js";

// Implement the local strategy
const localstrategy = new LocalStrategy(
    { 
        username: "username", 
        password: "password", 
        passReqToCallback: true // Allows access to req in the callback
    },
    async (req, username, password, done) => {
        try {
            let findUser = await User.findOne({ username });
            
            // If user doesn't exist, return an error
            if (!findUser) {
                return done(null, false, { message: "User not found" });
            }
            
            // User found, check the password
            if (comparePassword(password, findUser.password)) {
                return done(null, findUser);
            } else {
                return done(null, false, { message: "Password doesn't match" });
            }
            
        } catch (err) {
            return done(err);
        }
    }
);

export default localstrategy;
