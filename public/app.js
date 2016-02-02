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
}]);//end of controller
	
	
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
	
	
	
	
  //end of function
})();
