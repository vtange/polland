(function() {
    //start of function
  var app = angular.module('chartViewer', []);

app.controller('MainCtrl', ['$scope', function($scope){
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	$scope.poll = {};
	$scope.init = function(package){
		$scope.poll = package[0];
		$scope.getData();
	}
	$scope.getData = function(){
		var data=[];
		$scope.poll.choices.forEach(function(choice){
			data.push({value:choice.votes,label:choice.choice,color:getRandomColor()})
		})
		$scope.chartView(data);
	};
	var context = document.getElementById('chart').getContext('2d');
	$scope.chartView = function(data){
		var prevChart = new Chart(context).Pie(data); ;
		if($scope.poll.chartType==="Pie"){
			prevChart.destroy();
			prevChart = new Chart(context).Pie(data);
		}
		else if($scope.poll.chartType==="Bar"){
			prevChart.destroy();
			prevChart = new Chart(context).Bar(data);
		}
		else if($scope.poll.chartType==="Line"){
			prevChart.destroy();
			prevChart = new Chart(context).Line(data);
		}
	}
	
	
	
	$scope.formData = {voteFor:"0"};
	$scope.addChoice = function(){
		$scope.newPoll.choices.push({ choice: '', votes: 0 });
	}
	$scope.vote = function(){
		console.log($scope.formData);
		console.log("hi");
	}
	
	
	
	
	
	}]);//end of controller
  //end of function
})();