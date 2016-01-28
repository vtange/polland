console.log("	APP/ROUTES.JS")
var asyncc = require('async');
var crypto = require('crypto');
var User            = require('../app/models/user');
var flash    = require('connect-flash');

var nodemailer = require('nodemailer');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
			// populate list of polls
			
			
			
			
			
			
			
        }); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to home page with logged in status
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
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
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));
	
	// =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));

	// =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
    }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================
//use passport.authorize to connect social accounts with current user
    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));




    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
	
	
	
	// =====================================
    // FORGOT ===============================
    // =====================================
    // show the login form
    app.get('/forgot', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('forgot.ejs', { message: req.flash('info') }); 
    });
	
    // =====================================
    // FORGOT PASSWORD =====================
    // =====================================
	app.post('/forgot', function(req, res, next) {
	  asyncc.waterfall([
		function(done) {
		  crypto.randomBytes(20, function(err, buf) {
			var token = buf.toString('hex');
			done(err, token);
		  });
		},
		function(token, done) {
		  User.findOne({ 'local.email' : req.body.email }, function(err, user) {
			if (!user) {
			  req.flash('info', 'No account with that email address exists.');
			  return res.redirect('/forgot');
			}

			user.local.resetPasswordToken = token;
			user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour

			user.save(function(err) {
			  done(err, token, user);
			});
		  });
		},
		function(token, user, done) {
			var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: '@gmail.com',
				pass: ''
			}
			});
		  var mailOptions = {
			to: user.local.email,
			from: 'passwordreset@demo.com',
			subject: 'Node.js Password Reset',
			text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			  'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		  };
		  transporter.sendMail(mailOptions, function(err) {
			req.flash('info', 'An e-mail has been sent to ' + user.local.email + ' with further instructions.');
			done(err, 'done');
		  });
		}
	  ], function(err) {
		if (err) return next(err);
		res.redirect('/forgot');
	  });
	});
	app.get('/reset/:token', function(req, res) {
	  User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
		if (!user) {
		  req.flash('error', 'Password reset token is invalid or has expired.');
		  return res.redirect('/forgot');
		}
		res.render('reset.ejs', {
		  token: req.params.token,
		  message: req.flash('info'),
		  user: req.user
		});
	  });
	});
	
	app.post('/reset/:token', function(req, res) {
	  asyncc.waterfall([
		function(done) {
		  User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, function(err, user) {
			if (!user) {
			  req.flash('info', 'Password reset token is invalid or has expired.');
			  return res.redirect('back');
			}

			user.local.password = user.generateHash(req.body.password);
			user.local.resetPasswordToken = undefined;
			user.local.resetPasswordExpires = undefined;

			user.save(function(err) {
			  req.logIn(user, function(err) {
				done(err, user);
			  });
			});
		  });
		},
		function(user, done) {
			var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: '@gmail.com',
				pass: ''
			}
			});
		  var mailOptions = {
			to: user.local.email,
			from: 'passwordreset@demo.com',
			subject: 'Your password has been changed',
			text: 'Hello,\n\n' +
			  'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
		  };
		  transporter.sendMail(mailOptions, function(err) {
			req.flash('info', 'Success! Your password has been changed.');
			done(err);
		  });
		}
	  ], function(err) {
		res.redirect('/');
	  });
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}