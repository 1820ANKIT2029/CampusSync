import { Router } from 'express';

import { ensureLoggedIn } from '../middleware/protectRoute.js';
import { profile, handleImageUpload, profileEdit } from '../controllers/user.controller.js';

const HomeRouter = Router();


HomeRouter.get('/', (req, res, next)=>{
    res.send(`CampusSync CodeSangam 2024.`);
});

HomeRouter.get('/profile', ensureLoggedIn, profile);
HomeRouter.post('/profile/edit', ensureLoggedIn, handleImageUpload, profileEdit);


export default HomeRouter;