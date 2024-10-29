import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from "express-session"
import passport from 'passport';
import MongoStore from 'connect-mongo';

import { connectToMongoDB } from './db/ConnectMongoDB.js'

import AuthRouter from './routes/auth.routes.js';
import HomeRouter from './routes/home.routes.js';

import { googlestrategy, localstrategy} from './strategies/index.js'
import { User } from './models/user.models.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000*60,
        },
        // define place to store sessions
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URI,
            collectionName: 'sessions',
        }),
    })
)

app.use(passport.initialize());
app.use(passport.session());

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

passport.use("google", googlestrategy);
passport.use("local", localstrategy)

app.use('/', HomeRouter);  // home api routes for testing
app.use('/auth', AuthRouter);  // auth api router

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
    console.log(`Url: 127.0.0.1:${PORT}`);
})