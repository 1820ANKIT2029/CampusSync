import { Router } from 'express';
import { ensureLoggedIn, ensureAdmin } from '../middleware/protectRoute.js';
import { createTask,removeTask } from '../controllers/task.controller.js';
import { createEvent, removeEvent } from '../controllers/event.controller.js';
import { addNews, removeNews } from '../controllers/news.controller.js';
import { 
    adminEvents, 
    adminEventById, 
    adminActiveEvents, 
    adminInactiveEvents,
    adminNews,
    adminNewsById
} from '../controllers/admin.controller.js';

const AdminRouter = Router();

AdminRouter.use(ensureLoggedIn, ensureAdmin);

AdminRouter.put('/event/create', createEvent);
AdminRouter.put('/event/task/create', createTask);
AdminRouter.delete('/event/delete', removeEvent);
AdminRouter.delete('/event/task/delete', removeTask);
AdminRouter.post('/news/create', addNews);
AdminRouter.put('/news/edit/:newsId', EditNews);
AdminRouter.delete('/news/delete', removeNews);
AdminRouter.put('/submission/verify/:submissionId', verifySubmission);

AdminRouter.get('/event', adminEvents);
AdminRouter.get('/event/details/:eventId', adminEventById);
AdminRouter.get('/event/active', adminActiveEvents);
AdminRouter.get('/event/inactive', adminInactiveEvents);
AdminRouter.get('/news', adminNews);
AdminRouter.get('/news/:newsId', adminNewsById)

export default AdminRouter;