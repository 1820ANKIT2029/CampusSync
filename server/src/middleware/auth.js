module.export = {
    // user authenticated then redirect to next page
    ensureLoggedIn: function(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/login');
        }
    },

    // ensuring the user is logged out(used while going to login page)
    ensureLoggedOut: function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect("/")
        }
    }
}