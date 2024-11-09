import { Profile } from "../models/user.models.js"
import jwt from 'jsonwebtoken';

export const SocketTokenGenerater = async (value) => {
    try{
        const token = jwt.sign(
                { profileId: value},
                process.env.SESSION_SECRET,
                { expiresIn: '1d' }
            );
        return token;
    }catch(error){
        console.log(error);
        return false
    }
}

export const setSocketAuthToken = async (req, res, next) => {
    const id = req.user.id;
    try{
        const profile =  await Profile.findOne({userid: id}).select('_id');
        const token = await SocketTokenGenerater(profile._id);
        if(token){
            res.cookie('socket_token', token, {
                maxAge: 24*60*60*1000
            });

            return res.status(200).json({message: "cookies set"});
        }

    return res.status(400).json({error: "error in Set Socket Auth token"});
    }catch(err){
        return res.status(500).json({error: "error in Set Socket Auth token"})
    }
}

export const SocketTokenVerify = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        const profile = await Profile.findById(decoded.profileId);
        
        if (!profile) {
            console.log("Profile not found for token");
            return false;
        }
        return decoded;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const CheckTokenInSocket = async (socket, next) => {
    try{
        const token = socket.handshake.auth.token;

        if (!token) {
            socket.emit("authError", "{ message: 'No token provided' }", () => {
                socket.disconnect();
            });
            return;
        }
        
        console.log(token);

        const verifiedToken = await SocketTokenVerify(token);

        if (!verifiedToken) {
            socket.emit("authError", { message: "Invalid token" }, () => {
                socket.disconnect();
            });
            return;
        }

        console.log("Auth passed for profileId:", verifiedToken);

        socket.profileId = verifiedToken.profileId;
        next();
    }catch(error){
        console.log(error);
    }
    
};