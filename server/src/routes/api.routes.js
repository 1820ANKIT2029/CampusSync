import { Router } from 'express';
import { getevents, getnews, eventinfo, getnewss } from '../controllers/api.controller.js';

const ApiRouter = Router();

// /api/events?date=<DATE>&AdminName=<NAME>
ApiRouter.get('/events', getevents);
// /api/news?date=<DATE>&AdminName=<NAME> 
ApiRouter.get('/news/:num', getnews);
ApiRouter.get('/news', getnewss);


ApiRouter.get('/event/info', eventinfo);

export default ApiRouter;