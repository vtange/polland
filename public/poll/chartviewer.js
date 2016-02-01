(function() {
    //start of function
  var app = angular.module('chartViewer', []);

app.controller('MainCtrl', ['$scope', '$window', '$http', function($scope, $window, $http){
	var data=[];
	$scope.hasData = function(){
		var hasVotes = false;
		data.forEach(function(choice){
			if(choice.value>0){
				hasVotes = true;
			}	
		})
		return hasVotes;
	}
	
	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	$scope.poll = {};
	$scope.voted = false;
	$scope.link = $window.location.href;
	$scope.init = function(package){
		$scope.poll = package[0][0];
		$scope.voted = package[1]?true:false;
		$scope.getData();
	}
	var context = document.getElementById('chart').getContext('2d');
	var _chart = new Chart(context);
	var prevChart;
	$scope.getData = function(){
		$scope.poll.choices.forEach(function(choice){
			data.push({value:choice.votes,label:choice.choice,color:getRandomColor()})
		})
		$scope.genChart(_chart,data);
	};
	$scope.genChart = function(chart, data){
		if($scope.poll.chartType==="Pie"){
			prevChart = chart.Pie(data);
		}
		else if($scope.poll.chartType==="Bar"){
			prevChart = chart.Bar(data);
		}
		else if($scope.poll.chartType==="Line"){
			prevChart = chart.Line(data);
		}
	}
	
	
	
	$scope.formData = {voteFor:"0"};
	$scope.addChoice = function(){
		$scope.newPoll.choices.push({ choice: '', votes: 0 });
	}
	$scope.vote = function(){
		$http.put($window.location.href,$scope.formData);
		data[$scope.formData.voteFor].value += 1;
		prevChart.destroy();
		$scope.genChart(_chart,data);
		$scope.voted = true;
	}
	
	
	
	
	
	}]);//end of controller
  //end of function
})();