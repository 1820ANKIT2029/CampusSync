import { connect } from 'mongoose';

const connectToMongoDB = async ()=>{
    try{
        await connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected ..");

    } catch(error){
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default {
    connectToMongoDB
};