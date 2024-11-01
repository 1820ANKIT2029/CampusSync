import { Router } from 'express';
import { ensureLoggedIn } from '../middleware/protectRoute.js';
import { event, profile } from '../controllers/user.controller.js';


const UserRouter = Router();

UserRouter.get('/event', ensureLoggedIn, event );
UserRouter.get('/event/active', ensureLoggedIn);
UserRouter.get('/active/inactive', ensureLoggedIn)
UserRouter.get('/profile',ensureLoggedIn , profile);
UserRouter.post('/profile/edit', ensureLoggedIn);


export default UserRouter;