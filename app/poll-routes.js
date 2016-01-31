console.log("	APP/POLL-ROUTES.JS")

// load up the poll model
var Poll       = require('../app/models/poll');
var shortid  = require('shortid');

// app/routes.js
module.exports = function(app) {

    // =====================================
    // CREATE/EDIT POLL =====================//DROPPED/ USE FOR OPTIONS
    // =====================================
    // you have to be logged in to make or edit a poll
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/newpoll', isLoggedIn, function(req, res) {
        res.render('poll-create.ejs');
    });
	
	// get user from session
    app.post('/newpoll', function(req, res) {
        var author = req.user;
		var incoming = req.body;
		var newPoll            = new Poll();
		newPoll.question = incoming.question;
		newPoll.asker = author;
		newPoll.postDate = Date.now();
		newPoll.chartType = incoming.chartType;
		newPoll.link = shortid.generate();
		newPoll.choices = incoming.choices;
		newPoll.save(function(err) {
			if (err)
				throw err;
			author.polls.push(newPoll);
			author.save(function(err){
				if(err)
					throw err;
				console.log('author updated')
			})
			console.log('saved a new poll')
		});
		res.redirect('/');
    });	
	// =====================================
    // VIEW POLL =====================//DROPPED/ USE FOR OPTIONS
    // =====================================
    // you don't have to be logged in to view a poll
    // will need to find a poll by link in mongo DB , and return it as a package.
    app.get('/poll/:pollLink', function(req, res) {
		var link = req.params.pollLink;
        res.render('poll-view.ejs', {
            user : req.user, // get the user out of session and pass to template, if user == author, editable.
			link : link
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