(function() {
    //start of function
  var app = angular.module('VoteApp', []);

app.factory('UserService', function(){
	var obj = {};
	return obj;
});//end of service

app.controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService){
    $scope.UserService = UserService; // load service
       //init
    $scope.activeUser = null;

}]);//end of controller
  //end of function
})();
