(function() {
    //start of function
  var app = angular.module('chartBuilder', []);

app.controller('MainCtrl', ['$scope', function($scope){

	var pieData = [
	   {
		  value: 25,
		  label: 'Java',
		  color: '#811BD6'
	   },
	   {
		  value: 10,
		  label: 'Scala',
		  color: '#9CBABA'
	   },
	   {
		  value: 30,
		  label: 'PHP',
		  color: '#D18177'
	   },
	   {
		  value : 35,
		  label: 'HTML',
		  color: '#6AE128'
	   }
	];
	var barData = [
	   {
		  value: 25,
		  label: 'Java',
		  color: '#811BD6'
	   },
	   {
		  value: 10,
		  label: 'Scala',
		  color: '#9CBABA'
	   },
	   {
		  value: 30,
		  label: 'PHP',
		  color: '#D18177'
	   },
	   {
		  value : 35,
		  label: 'HTML',
		  color: '#6AE128'
	   }
	];
	var lineData = [
	   {
		  value: 25,
		  label: 'Java',
		  color: '#811BD6'
	   },
	   {
		  value: 10,
		  label: 'Scala',
		  color: '#9CBABA'
	   },
	   {
		  value: 30,
		  label: 'PHP',
		  color: '#D18177'
	   },
	   {
		  value : 35,
		  label: 'HTML',
		  color: '#6AE128'
	   }
	];
	$scope.newPoll = {chartType:"Pie",choices:[]};
var context = document.getElementById('chart').getContext('2d');
var skillsChart;
	
	$scope.chartPreview = function(){

		if($scope.newPoll.chartType==="Pie"){
			skillsChart = new Chart(context).Pie(pieData);
		}
		else if($scope.newPoll.chartType==="Bar"){
			skillsChart = new Chart(context).Bar(barData);
		}		
		else if($scope.newPoll.chartType==="Line"){
			skillsChart = new Chart(context).Line(lineData);
		}
	}

	}]);//end of controller
  //end of function
})();