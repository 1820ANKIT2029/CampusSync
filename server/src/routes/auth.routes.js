import { Router } from 'express';
//import "../util/passport.Google.js"

import { signupV1} from '../controller/auth.controller.js';
// import passport from 'passport';
import passport from '../strategies/google-strategy.js'; 

const AuthRouter = Router();

//AuthRouter.post('/login/v1', loginV1);
AuthRouter.get('/login/OAuth', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res, next)=>{
    req.session.user = findUser;
});
AuthRouter.get('/login/OAuth/callback', passport.authenticate('google', { successRedirect: '/auth/success', failureRedirect: '/auth/error' }))
AuthRouter.post('/signup/v1', signupV1);
// AuthRouter.post('/signup/Oauth', signupOAuth);
//AuthRouter.post('/logout', logout);

//AuthRouter.get('/success', success);
//AuthRouter.get('/error', error);

AuthRouter.get('/success', (req, res) => {
    res.send("Login successful! Welcome " + req.user.email);
});

// Error route
AuthRouter.get('/error', (req, res) => {
    res.send("Login failed! Please try again.");
});

export default AuthRouter;