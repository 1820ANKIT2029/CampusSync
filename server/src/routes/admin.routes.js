import { Router } from 'express';
import { ensureLoggedIn } from '../middleware/protectRoute.js';
import { createTask,removeTask } from '../controllers/task.controller.js';
import { createEvent, removeEvent } from '../controllers/event.controller.js';
import { addNews, removeNews } from '../controllers/news.controller.js';

const AdminRouter = Router();

AdminRouter.post('/event/create',ensureLoggedIn, createEvent);

AdminRouter.post('/event/task/create',ensureLoggedIn ,createTask);

AdminRouter.delete('/event/delete',ensureLoggedIn, removeEvent);

AdminRouter.delete('/event/task/delete',ensureLoggedIn ,removeTask);

AdminRouter.post('/news/create',ensureLoggedIn,addNews);

AdminRouter.delete('/news/delete',ensureLoggedIn,removeNews);

export default AdminRouter;