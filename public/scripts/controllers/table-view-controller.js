app.controller('SortableTableCtrl', function($scope, $http) {
    //var scope = this;

    $http.get('/dashboard/clients').success( function(clients) {
    	$scope.allClients = clients;
   
    // data
		$scope.head = {
	        a: "Name",
	        b: "TotalAssets"
	    };
	 
	 	var allClients = [];
	 	var i=0;
		for (i=0; i<clients.length; i++) {
			var name = clients[i].name.last + ", " + clients[i].name.first;
		    allClients.push({
		    	a: name,
		    	b: clients[i].totalAssets
		    });
		}

	    $scope.body = allClients;
    
	});
    
	$scope.sort = {
        column: 'b',
        descending: false
    };

	$scope.selectedCls = function(column) {
        return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
    };
    
    $scope.changeSorting = function(column) {
        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };
});

