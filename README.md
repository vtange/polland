# polland

# Takeaways

 - CSS/JS -> Sidescrolling
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
 



 - Using ng-init to send JS data from server to client

```
// .ejs file within HTML
data-ng-init="package = <%= packagedUser %>;autologUser(package)"

// route file
        res.render('index.ejs', {
			packagedUser : JSON.stringify(req.user)
```

 - Gotcha req.user vs author in relationship must be both toString() to compare. Because they are objects and must be deep compared.
 - Chart.js -> Creating, updating, deleting Charts
 - Vanilla JS method of $(document).ready  ```document.addEventListener("DOMContentLoaded", function() {```
 - /public files directories are dependent on where the template .ejs file is

 

```
https://github.com/vtange/polland/commit/6d58224d4209c47b2bed76a8c625029e4bbade85
```
MongoDB
 - initDB file to create mock polls and mock users
 - Customizing/making new Models and interacting with them in MongoDB
 - ```.find({})``` and ```.findOne({})``` are async queries.
 
 - Use ```async``` module to ```.waterfall``` connect async in serial fashion
 
