// app/models/poll.js
// load the things we need
var mongoose = require('mongoose');
var shortid  = require('shortid');

// define the schema for our user model
var pollSchema = mongoose.Schema({

        question     : String,
        asker        : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	    postDate	: Date,
	    link		: String,
	    chartType	: String,
        choices     : [
		{	choice: String, votes: Number },
		{	choice: String, votes: Number },
		{	choice: String, votes: Number }
		]
});

// methods ======================
pollSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  var newLink = shortid.generate();
	
    // if postDate doesn't exist, add to that field
  if (!this.postDate)
    this.postDate = currentDate;

  // if link doesn't exist, add to that field
  if (!this.link)
    this.link = newLink;

  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Poll', pollSchema);
