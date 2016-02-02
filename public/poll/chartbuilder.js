(function() {
    //start of function
  var app = angular.module('chartBuilder', []);

app.controller('MainCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

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
	var barData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "My First dataset",
					fillColor: "rgba(220,220,220,0.5)",
					strokeColor: "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data: [65, 59, 80, 81, 56, 55, 40]
				},
				{
					label: "My Second dataset",
					fillColor: "rgba(151,187,205,0.5)",
					strokeColor: "rgba(151,187,205,0.8)",
					highlightFill: "rgba(151,187,205,0.75)",
					highlightStroke: "rgba(151,187,205,1)",
					data: [28, 48, 40, 19, 86, 27, 90]
				}
			]
	};
	var lineData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			},
			{
				label: "My Second dataset",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};
	var context = document.getElementById('chart').getContext('2d');
	var prevChart = new Chart(context).Pie(pieData);
	$scope.newPoll = {chartType:"Pie",choices:[{ choice: '', votes: 0 },{ choice: '', votes: 0 },{ choice: '', votes: 0 }]};
	$scope.chartPreview = function(){

		if($scope.newPoll.chartType==="Pie"){
			prevChart.destroy();
			prevChart = new Chart(context).Pie(pieData);
		}
		else if($scope.newPoll.chartType==="Bar"){
			prevChart.destroy();
			prevChart = new Chart(context).Bar(barData);
		}
		else if($scope.newPoll.chartType==="Line"){
			prevChart.destroy();
			prevChart = new Chart(context).Line(lineData);
		}
	}
	$scope.addChoice = function(){
		$scope.newPoll.choices.push({ choice: '', votes: 0 });
	}
	$scope.delChoice = function(){
		if($scope.newPoll.choices.length > 2){
			$scope.newPoll.choices.splice($scope.newPoll.choices.length-1,1);
		}
	}
	$scope.createPoll = function(){
		$http.post($window.location.href,$scope.newPoll).
        success(function(data) {
			$window.location.href = '/';
        }).error(function(data) {
            console.error("error in posting");
        })
	}
	}]);//end of controller
  //end of function
})();