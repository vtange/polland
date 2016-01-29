// app/models/poll.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var pollSchema = mongoose.Schema({

        question     : String,
        asker        : String,
	    postDate	: Date,
        choices     : [
		{	choice: String, votes: Number },
		{	choice: String, votes: Number },
		{	choice: String, votes: Number }
		]
});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Poll', pollSchema);