import { Router } from 'express';
import { ensureLoggedIn, ensureAdmin } from '../middleware/protectRoute.js';
import { createTask,removeTask } from '../controllers/task.controller.js';
import { createEvent, removeEvent } from '../controllers/event.controller.js';
import { addNews, removeNews } from '../controllers/news.controller.js';

const AdminRouter = Router();

AdminRouter.use(ensureLoggedIn, ensureAdmin);

AdminRouter.put('/event/create', createEvent);
AdminRouter.put('/event/task/create', createTask);
AdminRouter.delete('/event/delete', removeEvent);
AdminRouter.delete('/event/task/delete', removeTask);
AdminRouter.post('/news/create', addNews);
AdminRouter.delete('/news/delete', removeNews);
AdminRouter.put('/submission/verify/:submissionId', verifySubmission)

export default AdminRouter;