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
  //end of function
})();
