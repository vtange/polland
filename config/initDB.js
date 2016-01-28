console.log("	CONFIG/INITDB.JS");

// load up the poll model
var Polls       = require('../app/models/poll');

module.exports = function(){
				if (Polls.find().count() === 0) {
				// create sample polls
				var samplePolls = [
				  {
					question: 'Is Meteor awesome?',
			        asker        : 'Anonymous',
					postDate	: 'December 31, 2015',
					choices: [
					  { choice: 'Of course!', votes: 0 },
					  { choice: 'Eh', votes: 0 },
					  { choice: 'No. I like plain JS', votes: 0 }
					]
				  },
				  {
					question: 'Is CSS3 Flexbox the greatest thing since array_slice(bread)?',
				   	asker        : 'Anonymous',
					postDate	: 'December 31, 2015',
					choices: [
					  { choice: '100% yes', votes: 0 },
					  { choice: '200% yes', votes: 0 },
					  { choice: '300% yes', votes: 0 }
					]
				  }
				];

				// loop over each sample poll and insert into database
				samplePolls.forEach(function(poll) {
				  Polls.insert(poll);
				});

			  }
}