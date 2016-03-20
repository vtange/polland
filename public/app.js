(function() {
    //start of function
  var app = angular.module('VoteApp', []);

app.controller('MainCtrl', ['$scope', function($scope){
    //$scope.otherPolls = [poll1, poll2]
    $scope.myPolls = [];
	
    $scope.activeUser = null;
	$scope.init = function(package) {
		$scope.activeUser = package[0];
		$scope.otherPolls = package[1][0];
		$scope.myPolls = package[2][0];
	}
	$scope.pollType = function(poll){
		if(poll.chartType=="Pie"){
			return {"background-image":"url('img/pie.png')"};
		}
		if(poll.chartType=="Bar"){
			return {"background-image":"url('img/bar.png')"};
		}		
		if(poll.chartType=="Line"){
			return {"background-image":"url('img/line.png')"};
		}		
	}
	
	
	$scope.getTotalVotes = function(poll){
		return poll.choices.reduce(function(total,next){
			if(total.constructor === Number){
				return total + next.votes;
			}
			else{
				return total.votes + next.votes;
			}
				
		})
	}
	
	
	
}]);//end of controller
	
	
	$(function() {
		var myPollsPosition = 0;
		var otherPollsPosition = 0;
	   $(".user-ctrl-bar").mousewheel(function(event, delta) {
		   if(myPollsPosition + delta*100<=0 && myPollsPosition + delta*100>= $(".content").outerWidth() - $("#myPolls").outerWidth()-100){
			   myPollsPosition += (delta*100);
			   $("#myPolls").css("transform","translateX("+myPollsPosition+"px)");
			  event.preventDefault();
		   }
	   });
	   $(".polls-viewport").mousewheel(function(event, delta) {
		   if(otherPollsPosition + delta*100<=0 && otherPollsPosition + delta*100>= $(".content").outerWidth() - $("#otherPolls").outerWidth()-100){
			   otherPollsPosition += (delta*100);
			   $("#otherPolls").css("transform","translateX("+otherPollsPosition+"px)");
			  event.preventDefault();
		   }
	   });
		
	   $(".user-ctrl-bar").swipe({
		  swipeLeft:function(event, direction, distance, duration, fingerCount) {
			  if($("#myPolls").outerWidth() >  $(".content").outerWidth()){
				  var delta = distance * duration / 100;
				   myPollsPosition = Math.max(otherPollsPosition - delta, -($("#myPolls").outerWidth()));
				   $("#myPolls").css("transform","translateX("+myPollsPosition+"px)");
				  event.preventDefault();
			  }
		  },
		  swipeRight:function(event, direction, distance, duration, fingerCount) {
			  var delta = distance * duration / 100;
			   myPollsPosition = Math.min(otherPollsPosition + delta, 0);
			   $("#myPolls").css("transform","translateX("+myPollsPosition+"px)");
			  event.preventDefault();
		  }
		});
	   $(".polls-viewport").swipe({
		  swipeLeft:function(event, direction, distance, duration, fingerCount) {
			  if($("#otherPolls").outerWidth() >  $(".content").outerWidth()){
				  var delta = distance * duration / 100;
				   otherPollsPosition = Math.max(otherPollsPosition - delta, -($("#otherPolls").outerWidth()));
				   $("#otherPolls").css("transform","translateX("+otherPollsPosition+"px)");
				  event.preventDefault();
			  }
		  },
		  swipeRight:function(event, direction, distance, duration, fingerCount) {
			  var delta = distance * duration / 100;
			   otherPollsPosition = Math.min(otherPollsPosition + delta, 0);
			   $("#otherPolls").css("transform","translateX("+otherPollsPosition+"px)");
			  event.preventDefault();
		  }
		});

		
		
		
	});
	
	
	
	
  //end of function
})();
