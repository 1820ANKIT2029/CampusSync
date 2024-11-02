import { Router } from 'express';
import { ensureLoggedIn, ensureUser } from '../middleware/protectRoute.js';
import { event, profile, handleImageUpload, profileEdit, ActiveEvent, InactiveEvent } from '../controllers/user.controller.js';


const UserRouter = Router();

UserRouter.use(ensureLoggedIn, ensureUser);

UserRouter.get('/event', event );
UserRouter.get('/event/active', ActiveEvent);
UserRouter.get('/event/inactive', InactiveEvent);
UserRouter.get('/profile', profile);
UserRouter.post('/profile/edit', handleImageUpload, profileEdit);


export default UserRouter;