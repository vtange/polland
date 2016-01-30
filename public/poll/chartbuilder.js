document.addEventListener("DOMContentLoaded", function() {
//Data
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
	
	
// Get the context of the canvas element we want to select

var context = document.getElementById('skills').getContext('2d');
var skillsChart = new Chart(context).Pie(pieData);
	
	
	
});