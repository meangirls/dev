
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

var app = angular.module('myApp', ['ngMap', 'ui.bootstrap', 'pageslide-directive']);

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
      $http.get('/advisor-dashboard/scripts/clients.json').success( function(clients) {
        for (var i=0; i<clients.length; i++) {
          var client = clients[i];
          client.position = new google.maps.LatLng(client.latitude,client.longitude);
          client.title = client.name.first + " " + client.name.last + " " + client.address;
          
          if (client.markerImage == "large") {
        	  client.icon = {
        			  scale: 12,
        			  path: google.maps.SymbolPath.CIRCLE,
        		fillOpacity: 1,
        		fillColor: 'red',
        		strokeColor: '#333',
        		strokeWeight: 2
        	  }
          }
          else {
        	  client.icon = {
                	  path: google.maps.SymbolPath.CIRCLE,
                  		scale: 8,
                  		fillOpacity: 1,
                  		fillColor: 'red',
                		strokeColor: '#333',
                  		strokeWeight: 2
                  }
          }
         
	  
          var marker = new google.maps.Marker(client);
	  //marker.setIcon(client.markerImage);
	  
          google.maps.event.addListener(marker, 'click', function() {
            $scope.client = this;
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