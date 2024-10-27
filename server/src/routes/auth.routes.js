import { Router } from 'express';

import { loginV1, loginOAuth, signupV1, logout} from './controller/authController'

const AuthRouter = Router();

AuthRouter.post('/login/v1', loginV1);
AuthRouter.post('/login/OAuth', loginOAuth)
AuthRouter.post('/signup/v1', signupV1);
//AuthRouter.post('/signup/Oauth', signupOAuth);
AuthRouter.post('/logout', logout);

export default {
    AuthRouter
};