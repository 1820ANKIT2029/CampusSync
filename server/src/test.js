const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const savedata = async ()=> {
    const newUser = new User({
        username: "username",
        password: "password"
    });
    await newUser.save();
}

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB connected ..");
        await savedata();

    } catch(error){
        console.log("Error connecting to MongoDB", error.message);
    }
};
