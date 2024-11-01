import { Router } from 'express';
import { ensureLoggedIn } from '../middleware/protectRoute.js';
import { profile } from '../controllers/user.controller.js';


const UserRouter = Router();

UserRouter.get('/event',ensureLoggedIn );
UserRouter.get('/profile',ensureLoggedIn , profile);


export default UserRouter;