app.controller('barChartController',  function($scope, $http) {
    $scope.allClients = [];
    $scope.checked;
    $http.get('/advisor-dashboard/scripts/clients.json').success( function(clients) {
    	$scope.allClients = clients;
    
    	
  	  
	    var data = new google.visualization.DataTable();
	    
	    data.addColumn('string', 'Client Name');
		data.addColumn('number', 'Total Assets');
		
		var dataArray = [];
		dataArray.push(["Client Name", "Total Assets"]);
		
		
		
		for (i=0; i<clients.length; i++) {
			var name = clients[i].name.last + ", " + clients[i].name.first;
			dataArray.push([name, clients[i].totalAssets])
		 }

		var data = google.visualization.arrayToDataTable(dataArray);
//		                                            
//
		var options = {
			colors: ["#33aee5"],
			width: 1200,
			height: 1500,
			fontSize: 12,
			//height: $scope.allClients.length * 20,
			//chartArea: {'width': '100%', 'height': '80%'}
			//height: 100
			chartArea:{left:150,top:20,width:"100%",height:"100%"}
		};
//		
		var chart = new google.visualization.BarChart(document.getElementById('barChart'));
		chart.draw(data, options);
		window.chart=chart;
		
		
		google.visualization.events.addListener(chart, 'select', selectHandler);

		function selectHandler(e) {
			var selectedItem = chart.getSelection()[0];
			console.log(selectedItem.row);
			          if (selectedItem) {
			         	console.log($scope.allClients[selectedItem.row].id);
			          }
			$scope.clientInfo.show();
		} 
		
    });
});