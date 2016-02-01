(function() {
    //start of function
  var app = angular.module('chartViewer', []);

app.controller('MainCtrl', ['$scope', function($scope){

	var context = document.getElementById('chart').getContext('2d');
	$scope.poll = {};
	$scope.init = function(package){
		$scope.poll = package[0];
	}
	
	
	
	
	
	
	
	
	}]);//end of controller
  //end of function
})();