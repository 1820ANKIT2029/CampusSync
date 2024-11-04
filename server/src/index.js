import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from "express-session"
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';

import { connectToMongoDB } from './db/ConnectMongoDB.js'

import AuthRouter from './routes/auth.routes.js';
import HomeRouter from './routes/home.routes.js';
import AdminRouter from './routes/admin.routes.js';
import SubmissionRouter from './routes/submission.routes.js';
import UserRouter from './routes/user.routes.js';
import ApiRouter from './routes/api.routes.js';

import { googlestrategy, localstrategy} from './strategies/index.js'
import { User } from './models/user.models.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: ["http://localhost:5173", "https://your-production-url.com"], // Allow specific origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    exposedHeaders: ["Authorization"], // Expose specific headers to the client
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    preflightContinue: false, // Pass the CORS preflight response to the next handler
    optionsSuccessStatus: 204, // Respond with 204 for successful OPTIONS requests
};

// Apply CORS middleware
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000*60,
            httpOnly: false
        },
        // define place to store sessions
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URI,
            collectionName: 'sessions',
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        const result = {
            id : user._id,
            username: user.username
        };
        done(null, result);
    } catch (error) {
        done(error, null);
    }
});


passport.use("google", googlestrategy);
passport.use("local", localstrategy);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use('/', HomeRouter);  // home api routes for testing
app.use('/auth', AuthRouter);  // auth api router
app.use('/admin',AdminRouter); // admin api router
app.use('/submit', SubmissionRouter); // submission api router
app.use('/user', UserRouter);  // get user related value
app.use('/api', ApiRouter); // get events, news etc data (login not require)

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
    console.log(`Url: 127.0.0.1:${PORT}`);
})