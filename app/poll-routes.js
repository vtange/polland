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
		var getPoll;
		var master = false;
		Poll.find({link:req.params.pollLink},function(err,poll){
			if(err){
				throw err;
			}
			if (req.isAuthenticated()){
				if (req.user._id.toString() == poll[0].asker.toString()){
					master = true;
				}
			}
			getPoll = poll;
				res.render('poll-view.ejs', {
				user : req.user, // get the user out of session and pass to template, if user == author, editable.
				isAuthor : master,
				package : JSON.stringify([getPoll,master])
        	});
		})
    });
    app.put('/poll/:pollLink', function(req, res) {
		Poll.findOne({link:req.params.pollLink},function(err,poll){
			if(err){
				throw err;
			}
			if(req.body.voteFor >= poll.choices.length){
				poll.choices.push({choice:req.body.custom,votes:1});
				poll.save(function(err){
				if(err)
					throw err;
				console.log('poll got new choice')
				});
			}
			else{
				poll.choices[req.body.voteFor].votes +=1;
				poll.save(function(err){
				if(err)
					throw err;
				console.log('poll got new vote')
				});
			}
		})
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