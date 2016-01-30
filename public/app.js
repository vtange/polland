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
    $scope.myPolls = [{
						question: 'Is Dart awesome?',
						asker        : 'Ford',
						postDate	: 'February 4, 2016',
						link		: "F42af-493k",
						choices: [
						  { choice: 'Of course!', votes: 0 },
						  { choice: 'Eh', votes: 0 },
						  { choice: 'No. I like plain JS', votes: 0 }
						]
					  },
					  {
						question: 'Is it OK to eat ice cream when you are sick?',
						asker        : 'Thomas',
						postDate	: 'July 31, 2015',
						link		: "43ase2-845m",
						choices: [
						  { choice: '100% no', votes: 0 },
						  { choice: '200% no', votes: 0 },
						  { choice: '300% no', votes: 0 }
						]
					  }]
	
    $scope.activeUser = null;
	$scope.init = function(package) {
		$scope.activeUser = JSON.parse(package)[0];
		$scope.otherPolls = JSON.parse(package)[1][0];
	}
	
}]);//end of controller
  //end of function
})();
