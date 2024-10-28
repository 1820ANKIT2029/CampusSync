import { Router } from 'express';
import passport from 'passport';
import "../util/passport.Google.js"

import { loginV1, signupV1, logout, success, error } from './controller/authController';
import { authenticate } from passport;

const AuthRouter = Router();

AuthRouter.post('/login/v1', loginV1);
AuthRouter.get('/login/OAuth', authenticate('google', { scope: ['profile', 'email'] }));
AuthRouter.get('/login/OAuth/callback', authenticate('google', { successRedirect: '/auth/success', failureRedirect: '/auth/error' }))
AuthRouter.post('/signup/v1', authenticate('local'), signupV1);
// AuthRouter.post('/signup/Oauth', signupOAuth);
AuthRouter.post('/logout', logout);

AuthRouter.get('/success', success);
AuthRouter.get('/error', error);

export default {
    AuthRouter
};