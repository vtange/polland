(function() {
    //start of function
  var app = angular.module('VoteApp', []);

app.factory('UserService', function(){

});//end of service

app.controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService){
    $scope.UserService = UserService; // load service
       //init
    $scope.list = [];
    $scope.LoginDetails = {};
    $scope.activeUser = null;
    $scope.show_login = function () {
        if ($scope.activeUser) {
            return { "transform": "translateX(300%)" };
        }
        else{
        return { "transform": "translateX(0%)" };
        }
    };
    $scope.show_user = function () {
        if ($scope.activeUser) {
            return { "transform": "translateX(0%)" };
        }
        else{
        return { "transform": "translateX(-200%)" };
        }
    };
    
    $scope.registerMode = "Login";
    $scope.toggleRegisterTxt = "New? Register Here!";
    $scope.toggleRegister = function(){
        if ($scope.registerMode == "Login"){
            $scope.registerMode = "Register";
            $scope.toggleRegisterTxt = "Back to Login";
        }
        else{
            $scope.registerMode = "Login";
            $scope.toggleRegisterTxt = "New? Register Here!";
        }
    };
    $scope.addUser = function(){

    };
    $scope.userLogout = function(){

    };
}]);//end of controller
  //end of function
})();
