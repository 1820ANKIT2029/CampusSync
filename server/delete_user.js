import { connectToMongoDB } from "./src/db/ConnectMongoDB.js"
import dotenv from 'dotenv';
dotenv.config();

import { Profile, User } from "./src/models/user.models.js";

connectToMongoDB();

const profileUserIds = await Profile.distinct('userid');
    
    // Delete users whose `_id` is not in `profileUserIds`
const result = await User.deleteMany({ _id: { $nin: profileUserIds } });