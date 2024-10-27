import { Router } from 'express';

const HomeRouter = Router();

HomeRouter.get('/', (req, res, next)=>{
    res.send("AuraTracker CodeSangam 2024");
})

export default {
    HomeRouter
};