
var clusterStyles = [
  
 {
    textColor: 'white',
    url: '/assets/images/56.png',
    height: 56,
    width: 56
  },
 {
    textColor: 'white',
    url: '/assets/images/66.png',
    height: 66,
    width: 66
},
 {
    textColor: 'white',
    url: '/assets/images/78.png',
    height: 78,
    width: 78
}
];

var mcOptions = {
    gridSize: 50,
    styles: clusterStyles,
    maxZoom: 15
};


var app = angular.module('myApp', ['ngMap', 'ui.bootstrap', 'pageslide-directive', 'nvd3ChartDirectives']);
app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});



 function ExampleCtrl($scope, $http){
 $http.get('/advisor-dashboard/scripts/allocations.json').success(function(allocations) {
				
				//$scope.transactions = transactions;
				console.log("VIMMVIMMVIMM");
				console.log(allocations);
				var colors= [
					 			'#1E5AA0',
								'#33AEE5',
								'#008F45',
								'#81B24F',
								'#F2B900'
							];
				//var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];
$scope.colorFunction = function() {
	return function(d, i) {
    	return colors[i];
    };
}	
				 $scope.exampleData = [];
				 for (var i=0; i<allocations.length; i++) {
					console.log("looping");
					console.log({key: allocations[i].fundAbbreviation, y: allocations[i].percent} );
				//	console.log(allocation[i].fundAbbreviation);
					 $scope.exampleData[i]={key: allocations[i].fundAbbreviation, y: allocations[i].percent} ;
				 }
				 
				 
			});
 $scope.xFunction = function(){
    return function(d) {
        return d.key;
    };
}

 $scope.yFunction = function(){
	return function(d){
		return d.y;
	};
}

 $scope.vimmexampleData = [
      	{ key: "One", y: 5 },
         { key: "Two", y: 2 },
         { key: "Three", y: 9 },
        { key: "Four", y: 7 },
        { key: "Five", y: 4 },
        { key: "Six", y: 3 },
       { key: "Seven", y: 9 }
    ];
    // $http.get('/advisor-dashboard/scripts/allocations.json').success( function(allocations) {
    	
 }

    
  app.controller('mapController', function($scope, $http, StreetView) {
	  
	  $scope.checked;
	  
	  $scope.tabs = [
	                 { title:'Dynamic Title 1', content:'Dynamic content 1' },
	                 { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
	               ];
	  
    $scope.map;
    $scope.clients = [];
    
    $scope.$on('mapInitialized', function(event, evtMap) {
      map = evtMap;
      $scope.map = map;
      console.log('loading scripts/clients.json');
      $http.get('/dashboard/clients').success( function(clients) {
    	
        for (var i=0; i<clients.length; i++) {
          var client = clients[i];
          client.position = new google.maps.LatLng(client.latitude,client.longitude);
          client.title = client.name.first + " " + client.name.last + " " + client.address;
         
    	  client.icon = {
    		scale: (client.markerImage == "large") ? 12 : 8,
    		path: google.maps.SymbolPath.CIRCLE,
    		fillOpacity: 1,
    		fillColor: (client.alert == true) ? 'yellow' : ((client.financialTransaction == true ? 'green' : 'red')),
    		strokeColor: (client.alert == true && client.financialTransaction == true) ? 'green' : '#333',
    		strokeWeight: (client.alert == true && client.financialTransaction == true) ? 5 : 2
    	  }
                 
	  
          var marker = new google.maps.Marker(client);
	  //marker.setIcon(client.markerImage);
	  
          google.maps.event.addListener(marker, 'click', function() {
            $scope.client = this;
			$scope.alerts = [];
			$scope.transactions = [];
			$http.get('/dashboard/client/' + this.id + '/accounts').success(function(data) {
				$scope.accounts = data;
				for (var j=0;j<data.length; j++) {
					var accountNumber = data[j].acctNbr;
					if (this.alert) {
						$http.get('/dashboard/alerts/' + accountNumber).success(function(alerts) {
						if (alerts.length > 0)
							$scope.alerts = alerts;
						})
					}
					$http.get('/dashboard/transactions/' + accountNumber).success(function(transactions) {
						if (transactions.length >0)
							$scope.transactions = transactions;
					})
				}
			});
            StreetView.getPanorama(map).then(function(panoId) {
              $scope.panoId = panoId;
            });
            //map.setZoom(18);
            //map.setCenter(this.getPosition());
            $scope.clientInfo.show();
          });
        

          $scope.clients.push(marker); 
        }
        
        google.maps.event.addListener(map, 'click', function() {
      	  $scope.clientInfo.hide();
        });
        //console.log('finished loading scripts/starbucks.json', '$scope.clients', $scope.clients.length);
        $scope.markerClusterer = new MarkerClusterer(map, $scope.clients, mcOptions);
        //$scope.fullScreenToggle.click();
      });
    });
    $scope.showStreetView = function() {
      StreetView.setPanorama(map, $scope.panoId);
      $scope.clientInfo.hide();
    };
    $scope.showHybridView = function() {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      map.setTilt(45);
      $scope.clientInfo.hide();
    }
  });

  app.directive('fullScreenToggle', function() {
    return {
      link: function(scope, e, a) {
        this.click = function() {
          e.parent().toggleClass('full-screen');
          e.text( e.parent().hasClass('full-screen') ? 'Exit Full Screen' : 'Full Screen' );
          google.maps.event.trigger(scope.map, 'resize');
        };
        e.on('click', this.click);
        scope.fullScreenToggle = this;
      }
    }
  });

  app.directive('clientInfo', function() {
    var ClientInfo = function(s, e, a) {
      this.scope = s;
      this.element = e;
      this.attrs = a;
      this.show = function() {
    	  this.scope.checked = true;
      }
      this.hide = function() {
    	this.scope.checked = false;
      }
    };
    return {
      templateUrl: 'templates/client-info.html',
      link: function(scope, e, a) {
        scope.clientInfo= new ClientInfo(scope, e, a);
      }
    }

  });