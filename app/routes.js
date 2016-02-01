console.log("	APP/ROUTES.JS")

// load up the poll model
var Poll       = require('../app/models/poll');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
		//generate array of polls
		var myPolls = [];
		var otherPolls = [];
		if (req.user){
			Poll.find({asker:req.user},function(err,poll){
				if(err){
					throw err;
				}
				myPolls.push(poll);
			})
		}
		Poll.find(function(err,poll){
		if(err){
			throw err;
		}
		otherPolls.push(poll);
			
		    res.render('index.ejs', {
				user : req.user, // get the user out of session and pass to template
				packageForAngular : JSON.stringify([req.user,otherPolls,myPolls])
			}); // load the index.ejs file
			
		})
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', loginRedundancy, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', loginRedundancy, passport.authenticate('local-login', {
        successRedirect : '/', // redirect to home page with logged in status
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', loginRedundancy, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', loginRedundancy, passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to home page with logged in status
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================//DROPPED/ USE FOR OPTIONS
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
// prevent logged in folks from signing up/logging in again
function loginRedundancy(req, res, next) {
    if (req.isAuthenticated())
       res.redirect('/');
	else
		return next();
}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}