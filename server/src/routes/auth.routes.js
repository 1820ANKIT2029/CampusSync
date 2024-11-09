import { Router } from 'express';

import { ensureLoggedIn } from '../middleware/protectRoute.js';

import { loginV1, signupV1, googleLogin, googleLoginafter, googlecallback, logout, success, error } from '../controllers/auth.controller.js';
import { setSocketAuthToken } from '../controllers/socketAuth.controller.js';

const AuthRouter = Router();

AuthRouter.post('/login/v1', loginV1, success);

AuthRouter.get('/login/OAuth', googleLogin);

AuthRouter.get('/login/OAuth/callback', googlecallback);

AuthRouter.post('/signup/v1', signupV1);

AuthRouter.post('/logout', logout);

AuthRouter.get('/success', success);
AuthRouter.get('/error', error);

AuthRouter.get('/SocketAuthToken',ensureLoggedIn, setSocketAuthToken)

export default AuthRouter;