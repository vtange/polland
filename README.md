# polland

# Takeaways

 - CSS/JS -> Sidescrolling
```
https://github.com/vtange/polland/commit/6d58224d4209c47b2bed76a8c625029e4bbade85
```
MongoDB
 - initDB file to create mock polls and mock users
 - Customizing/making new Models and interacting with them in MongoDB
 - ```.find({})``` and ```.findOne({})``` are async queries.
 
 - Use ```async``` module to ```.waterfall``` connect async in serial fashion
 
 - Using ng-init to send JS data from server to client
 - Gotcha req.user vs author in relationship must be both toString() to compare. Because they are objects and must be deep compared.
 - Chart.js -> Creating, updating, deleting Charts
 - Vanilla JS method of $(document).ready  ```document.addEventListener("DOMContentLoaded", function() {```
 - /public files directories are dependent on where the template .ejs file is
