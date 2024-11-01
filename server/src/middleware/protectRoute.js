// user authenticated then redirect to next page
export const ensureLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.status(401).json({error: "not logged in"});
    }
}

// ensuring the user is logged out(used while going to login page)
export const ensureLoggedOut = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        return res.status(401).json({error: "already logged in"});
    }
}
