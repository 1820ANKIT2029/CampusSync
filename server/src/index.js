import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from "express-session"
import passport from 'passport';

import { connectToMongoDB } from './db/ConnectMongoDB'

import { AuthRouter } from './routes/auth.routes';
import { HomeRouter } from './routes/home.routes';

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
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/', HomeRouter);  // home api routes for testing
app.use('/auth', AuthRouter);  // auth api router

app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
    console.log(`Url: 127.0.0.1:${PORT}`);
})
