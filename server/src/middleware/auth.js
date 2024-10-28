// user authenticated then redirect to next page
const ensureLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/auth/login'); // need to change
    }
}

// ensuring the user is logged out(used while going to login page)
const ensureLoggedOut = function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/"); // need to change
    }
}

export default {
    ensureLoggedIn,
    ensureLoggedOut
};