![alt tag](http://res.cloudinary.com/dmj8qtant/image/upload/c_limit,w_600/v1456084188/qxlepewnyqaopzt0osgl.png)
# polland
Client logs in and adds polls. Polls can be voted on and given more choices by other users. Client can only view results, share its link, or delete the poll. Can see published polls and own polls.

## Tech
Express, EJS, MongoDB, AngularJS, Jquery, ChartJS, TimeAgo(livestamp + moment), ```shortid``` module, ```async``` module

## Niceties
Mousewheel + Swipe Sidescrolling (Jquery), Initialize DB always with mock user ![with async operations] (https://github.com/vtange/polland/blob/master/config/initDB.js). 

### Details
#### Routes
| GET        | POST           | PUT  | DELETE  |
| ---------- |:--------------:| ----:| -------:|
| Home       |                |      |         |
| Polls(Create,View)      |  Polls(Create)      |    Polls(Vote) |  Polls(Delete) |

#### CSS
 - Radial Gradient for Red half of UI.

#### JS
 - PlainJS vers. $(document).ready  ```document.addEventListener("DOMContentLoaded", function() {```
 - Sidescrolling
```
// we're basically moving the div left and right with stops before everything moves too far left or right
	$(function() {
		var myPollsPosition = 0;
		var otherPollsPosition = 0;
	   $(".user-ctrl-bar").mousewheel(function(event, delta) {
		   if(myPollsPosition + delta*100<=0 && myPollsPosition + delta*100>= $(".content").outerWidth() - $("#myPolls").outerWidth()-100){
			   myPollsPosition += (delta*100);
			   $("#myPolls").css("transform","translateX("+myPollsPosition+"px)")
			   console.log(myPollsPosition);
			  event.preventDefault();
		   }
	   });
	   $(".polls-viewport").mousewheel(function(event, delta) {
		   if(otherPollsPosition + delta*100<=0 && otherPollsPosition + delta*100>= $(".content").outerWidth() - $("#otherPolls").outerWidth()-100){
			   otherPollsPosition += (delta*100);
			   $("#otherPolls").css("transform","translateX("+otherPollsPosition+"px)")
			  event.preventDefault();
		   }
	   });
	});
```
 - Using ng-init to send data from server JS (Express) to client JS (EJS-Angular)
```
// .ejs file within HTML
data-ng-init="package = <%= packagedUser %>;autologUser(package)"

// route file
        res.render('index.ejs', {
			packagedUser : JSON.stringify(req.user)
```

 - Gotcha req.user vs author in relationship must be both toString() to compare. Because they are objects and must be deep compared.
```
if (req.isAuthenticated()){
	if (req.user._id.toString() == poll[0].asker.toString()){
		master = true;
	}
}
```
 - Login Check for Pages that require users
```
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};
```

 - Generate date and link for polls b4 saving
 ```
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
 ```
 
##### Hindsight
This app showcases the PROPER way of grabbing data from Mongo and sending it to Client in one go. Avoids multiple HTTP requests based on User's collected models. See "/" route. NOTE: Should've used promises for both Mongo Find() operations.
