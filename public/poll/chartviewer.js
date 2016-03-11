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

	function dataForBarsLines(data) {
		var modifiedData = {
			labels:[],
			datasets:[]
		};
		data.forEach(function(choice,index){
			modifiedData.labels.push(choice.label);
			modifiedData.datasets.push({
					fillColor: choice.color,
					strokeColor: choice.color,
					highlightFill: choice.color,
					highlightStroke: choice.color,
					data: data.map(function(item){
						return 0;
					})
			});
			modifiedData.datasets[index].data[index] = choice.value;
		});
		return modifiedData;
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
			prevChart = chart.Bar(dataForBarsLines(data));
		}
		else if($scope.poll.chartType==="Line"){
			prevChart = chart.Line(dataForBarsLines(data));
		}
	}
	
	
	
	$scope.formData = {voteFor:"0"};
	//$scope.formData.custom
	$scope.vote = function(){
		if($scope.formData.voteFor>=$scope.poll.choices.length){
			data.push({value:1,label:$scope.formData.custom,color:getRandomColor()})
		}
		else{
			data[$scope.formData.voteFor].value += 1;
		}
		$http.put($window.location.href,$scope.formData);
		prevChart.destroy();
		$scope.genChart(_chart,data);
		$scope.voted = true;
	}
	
	$scope.deletePoll = function(){
		$http.delete($window.location.href).success(function() {
			console.log('success is called');
			$window.location.href = '/';
		    
		  }).error(function(error) {
			console.log('error');
		  }).then(function() {
			console.log('then is called');
		  });;
	}
	
	
	
	}]);//end of controller
  //end of function
})();