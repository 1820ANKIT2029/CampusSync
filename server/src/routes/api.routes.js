import { Router } from 'express';
import { getevents, getnews, eventinfo, comment, NewsById } from '../controllers/api.controller.js';

const ApiRouter = Router();

// /api/events?date=<DATE>&AdminName=<NAME>
ApiRouter.get('/events', getevents);
// /api/news?date=<DATE>&AdminName=<NAME> 
ApiRouter.get('/news/:num', getnews);

ApiRouter.get("/comments", comment);

ApiRouter.get('/event/info', eventinfo);


ApiRouter.get('/news/:newsId', NewsById);

export default ApiRouter;