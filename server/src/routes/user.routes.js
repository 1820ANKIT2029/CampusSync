import { Router } from 'express';
import { ensureLoggedIn, ensureUser } from '../middleware/protectRoute.js';
import { 
    event, 
    profile, 
    handleImageUpload, 
    profileEdit, 
    ActiveEvent, 
    InactiveEvent,
    registerInEvent,
    registerInTask,
    UserStat,
    task
} from '../controllers/user.controller.js';
import { todolist, todo, todoadd, tododelete, tododone } from '../controllers/todo.controller.js';


const UserRouter = Router();

UserRouter.use(ensureLoggedIn, ensureUser);

UserRouter.get('/event', event );
UserRouter.get('/event/active', ActiveEvent);
UserRouter.get('/event/inactive', InactiveEvent);
UserRouter.get('/profile', profile);
UserRouter.get('/stats', UserStat);
UserRouter.post('/profile/edit', handleImageUpload, profileEdit);
UserRouter.post('/event/register', registerInEvent);
UserRouter.post('/event/task/register', registerInTask);

UserRouter.get("/task", task);

UserRouter.get('/todo', todolist);
UserRouter.get('/todo/:todoId', todo);
UserRouter.post('/todo/add', todoadd);
UserRouter.put('/todo/done/:todoId', tododone);
UserRouter.delete('/todo/delete/:todoId', tododelete);


export default UserRouter;