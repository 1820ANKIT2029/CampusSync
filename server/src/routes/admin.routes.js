import { Router } from 'express';
import { ensureLoggedIn, ensureAdmin } from '../middleware/protectRoute.js';
import { createTask,removeTask } from '../controllers/task.controller.js';
import { createEvent, removeEvent } from '../controllers/event.controller.js';
import { addNews, removeNews } from '../controllers/news.controller.js';

const AdminRouter = Router();

AdminRouter.use(ensureLoggedIn, ensureAdmin);

AdminRouter.post('/event/create', createEvent);
AdminRouter.post('/event/task/create', createTask);
AdminRouter.delete('/event/delete', removeEvent);
AdminRouter.delete('/event/task/delete', removeTask);
AdminRouter.post('/news/create', addNews);
AdminRouter.delete('/news/delete', removeNews);

export default AdminRouter;