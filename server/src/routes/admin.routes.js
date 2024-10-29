import { Router } from 'express';
import { ensureLoggedIn } from '../middleware/protectRoute';

const AdminRouter = Router();

AdminRouter.post('/create/Event',ensureLoggedIn, createEvent);

AdminRouter.post('/create/Event/task',ensureLoggedIn ,);

AdminRouter.delete('/delete/Event/:id',ensureLoggedIn, removeEvent);

AdminRouter.delete('/delete/Event/task/:id',ensureLoggedIn ,signupV1);

export default AdminRouter;