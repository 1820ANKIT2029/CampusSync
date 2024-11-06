import { Router } from 'express';

const HomeRouter = Router();

HomeRouter.get('/', (req, res, next)=>{
    console.log(req);
    res.send(`AuraTracker CodeSangam 2024. user = ${req.user.id}`);
})

export default HomeRouter;