console.log("	CONFIG/INITDB.JS");

// load up the poll model
var User       = require('../app/models/user');
var Poll       = require('../app/models/poll');
var shortid  = require('shortid');
var asyncc  = require('async');

module.exports = function(){
	function minimumUser(callback){
			User.findOne(function(err, user){
				if(err){
					throw err;
				}
				if (user === null){
					var mockUser=new User();
					mockUser.save(function(err) {
							if (err)
								throw err;
						console.log('saved a new user')
					});
				}
				callback(null,mockUser);
			});
	};
	function genMockPolls(user, callback){
				Poll.findOne(function(err, poll){

					if (poll === null) {

					// create sample polls
					var samplePolls = [
					  {
						question: 'Is Meteor awesome?',
						asker        : user,
						postDate	: 'December 31, 2015',
						chartType	: 'Pie',
						choices: [
						  { choice: 'Of course!', votes: 0 },
						  { choice: 'Eh', votes: 0 },
						  { choice: 'No. I like plain JS', votes: 0 }
						]
					  },
					  {
						question: 'Is CSS3 Flexbox the greatest thing since array_slice(bread)?',
						asker        : user,
						postDate	: 'December 31, 2015',
						chartType	: 'Pie',
						choices: [
						  { choice: 'No', votes: 0 },
						  { choice: 'Dunno', votes: 0 },
						  { choice: '100% yes', votes: 0 },
						  { choice: '200% yes', votes: 0 },
						  { choice: '300% yes', votes: 0 }
						]
					  }
					];

					// loop over each sample poll and insert into database
					for(var i = 0; i<samplePolls.length;i++){
						var newPoll            = new Poll();
						newPoll.question = samplePolls[i].question;
						newPoll.asker = samplePolls[i].asker;
						newPoll.postDate = samplePolls[i].postDate;
						newPoll.link = shortid.generate();
						newPoll.choices = samplePolls[i].choices;
						newPoll.save(function(err) {
							if (err)
								throw err;
							user.polls.push(newPoll);
							user.save(function(err) {
								if (err)
									throw err;
								console.log('new poll added to user');
							});
						});

					};

				  }
				  callback(null,"done");
			  });
	};
	asyncc.waterfall([minimumUser,genMockPolls], function(err,result){
		if(err){
			throw err;
		}
		else{
			return result;
		}
	});

}