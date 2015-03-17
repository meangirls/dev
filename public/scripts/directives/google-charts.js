"use strict";

app.directive("assetMixChart", function() {
	return function($scope, element, attrs) {
		$scope.$watch('amount', function() {
			var colors = [ '#1E5AA0', '#33AEE5', '#008F45', '#81B24F',
					'#F2B900' ];
			
			
			//var newData = [['Name', 'Total Assets']];
			
//			var data = google.visualization.arrayToDataTable([
//					[ 'Client Name', 'Total Assets' ],
//					
//					[ 'Cash', 24 ] ]);

			data.addColumn('string', 'Client Name');
			data.addColumn('number', 'Total Assets');
//			var data = google.visualization.arrayToDataTable([]
//					[ 'Client Name', 'Total Assets' ]
//			]);
		
			//console.log($scope.tabs);
			
			for (var i=0; i<= 10; i++) {
				data.addRow(["Name of Client", 320]);
			}
					
			var options = {
				colors : colors,
				width: 1024,
				height:600
			};
			
			var chart = new google.visualization.BarChart(document.getElementById('barChart'));
			chart.draw(data, options);
			
		}, true);
	}
});
