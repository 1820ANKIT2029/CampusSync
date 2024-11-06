import { Profile } from "../models/user.models.js"

export const SocketTokenGenerater = async (userId) => {
    try{
        const profile = await Profile.findOne({userid: userId}).select('_id');

        return jwt.sign(
            { profileId: profile._id },
            process.env.SESSION_SECRET,
            { expiresIn: '1d' }
        );
    }catch(error){
        console.log(error);
        return "false"
    }
    
}

export const SocketTokenVerify = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        const profile = await Profile.findById(decoded.profileId);
        
        if (!profile) {
            console.log("Profile not found for token");
            return "false";
        }

        return decoded.profileId;
    } catch (error) {
        console.log(error);
        return "false";
    }
}

export const setSocketAuthToken = async (req, res, next){
    const token = await SocketTokenGenerater(req.user.id);
    if(token){
        req.socket_token = token;
    }
    next();
}

export const CheckTokenInSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return socket.emit("authError", { message: "No token provided" }, () => {
            socket.close();
        });
    }

    if(!SocketTokenVerify(token)){
        return socket.emit("authError", { message: "Invalid token" }, () => {
            socket.close();
        });
    }

    next();
}