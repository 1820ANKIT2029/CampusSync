import { Router } from 'express';

import { loginV1, signupV1, googleLogin, googleLoginafter, googlecallback, logout, success, error } from '../controllers/auth.controller.js';
import { setSocketAuthToken } from '../controllers/socketAuth.controller.js';

const AuthRouter = Router();

AuthRouter.post('/login/v1', loginV1, setSocketAuthToken, success);

AuthRouter.get('/login/OAuth', googleLogin);

AuthRouter.get('/login/OAuth/callback', setSocketAuthToken, googlecallback);

AuthRouter.post('/signup/v1', signupV1);

AuthRouter.post('/logout', logout);

AuthRouter.get('/success', success);
AuthRouter.get('/error', error);

export default AuthRouter;