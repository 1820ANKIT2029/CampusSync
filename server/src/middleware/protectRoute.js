// user authenticated then redirect to next page
export const ensureLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/");
    }
}

// ensuring the user is logged out(used while going to login page)
export const ensureLoggedOut = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/");
    }
}
