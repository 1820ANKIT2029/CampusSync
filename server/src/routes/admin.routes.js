import { Router } from 'express';
import { ensureLoggedIn, ensureAdmin } from '../middleware/protectRoute.js';
import { createTask,removeTask } from '../controllers/task.controller.js';
import { createEvent, removeEvent } from '../controllers/event.controller.js';
import { addNews, removeNews, EditNews } from '../controllers/news.controller.js';
import { ValidSubmission, InvalidSubmission } from '../controllers/submission.controller.js'
import { 
    adminEvents, 
    adminEventById, 
    adminActiveEvents, 
    adminInactiveEvents,
    adminNews,
    adminNewsById,
    getStats
} from '../controllers/admin.controller.js';
import { profile, profileEdit, handleImageUpload } from '../controllers/user.controller.js';

const AdminRouter = Router();

AdminRouter.use(ensureLoggedIn, ensureAdmin);

AdminRouter.put('/event/create', createEvent);
AdminRouter.put('/event/task/create', createTask);
AdminRouter.delete('/event/delete', removeEvent);
AdminRouter.delete('/event/task/delete', removeTask);
AdminRouter.post('/news/create', addNews);
AdminRouter.put('/news/edit/:newsId', EditNews);
AdminRouter.delete('/news/delete/:newsId', removeNews);
AdminRouter.put('/submission/valid/:submissionId', ValidSubmission);
AdminRouter.put('/submission/invalid/:submissionId', InvalidSubmission);

AdminRouter.get('/event', adminEvents);
AdminRouter.get('/event/details/:eventId', adminEventById);
AdminRouter.get('/event/active', adminActiveEvents);
AdminRouter.get('/event/inactive', adminInactiveEvents);
AdminRouter.get('/news', adminNews);
AdminRouter.get('/news/:newsId', adminNewsById)

AdminRouter.get('/profile', profile);
AdminRouter.post('/profile/edit', handleImageUpload, profileEdit);

AdminRouter.get('/getStats',getStats);

export default AdminRouter;