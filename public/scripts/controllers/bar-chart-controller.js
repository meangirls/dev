app.controller('barChartController',  function($scope, $http) {
    $scope.allClients = [];
    $http.get('/advisor-dashboard/scripts/clients.json').success( function(clients) {
    	$scope.allClients = clients;
    
	    var data = new google.visualization.DataTable();
	    
	    data.addColumn('string', 'Client Name');
		data.addColumn('number', 'Total Assets');
		
		for (var i=0; i<= $scope.allClients.length; i++) {
			var name = $scope.allClients[i].name.first;
			var amount = $scope.allClients[i].totalAssets;
			console.log(name + amount);
			data.addRow([name, amount]);
		}

		var options = {
			width: 1024,
			height:600
		};
		
		var chart = new google.visualization.BarChart(document.getElementById('barChart'));
		chart.draw(data, options);
    });
});