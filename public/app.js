(function() {
    //start of function
  var app = angular.module('VoteApp', []);

app.factory('UserService', function(){
	var obj = {};
	return obj;
});//end of service

app.controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService){
    $scope.UserService = UserService; // load service
    //$scope.otherPolls = [poll1, poll2]
    $scope.activeUser = null;
	$scope.init = function(stringifiedArray) {
		$scope.otherPolls = JSON.parse(stringifiedArray)[0];
	}
	
}]);//end of controller
  //end of function
})();
