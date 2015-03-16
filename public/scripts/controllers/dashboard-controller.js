var clusterStyles = [
  {
    textColor: 'white',
    url: '/assets/images/bluedot.gif',
    height: 50,
    width: 50
  },
 {
    textColor: 'white',
    url: '/assets/images/bluedot.gif',
    height: 50,
    width: 50
  },
 {
    textColor: 'white',
    url: '/assets/images/bluedot.gif',
    height: 50,
    width: 50
  }
];

var mcOptions = {
	    gridSize: 50,
	    styles: clusterStyles,
	    maxZoom: 15
};

var app = angular.module('myApp', ['ngMap']);

  app.controller('mapController', function($scope, $http, StreetView) {
    $scope.map;
    $scope.stores = [];
    $scope.$on('mapInitialized', function(event, evtMap) {
      map = evtMap;
      $scope.map = map;
      console.log('loading scripts/starbucks.json');
      $http.get('/scripts/starbucks.json').success( function(stores) {
        for (var i=0; i<stores.length; i++) {
          var store = stores[i];
          store.position = new google.maps.LatLng(store.latitude,store.longitude);
          store.title = store.name;

          var marker = new google.maps.Marker(store);
          google.maps.event.addListener(marker, 'click', function() {
            $scope.store = this;
            StreetView.getPanorama(map).then(function(panoId) {
              $scope.panoId = panoId;
            });
            map.setZoom(18);
            map.setCenter(this.getPosition());
            $scope.storeInfo.show();
          });
          google.maps.event.addListener(map, 'click', function() {
            $scope.storeInfo.hide();
          });

          $scope.stores.push(marker); 
        }
        console.log('finished loading scripts/starbucks.json', '$scope.stores', $scope.stores.length);
        $scope.markerClusterer = new MarkerClusterer(map, $scope.stores, mcOptions);
        $scope.fullScreenToggle.click();
      });
    });
    $scope.showStreetView = function() {
      StreetView.setPanorama(map, $scope.panoId);
      $scope.storeInfo.hide();
    };
    $scope.showHybridView = function() {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      map.setTilt(45);
      $scope.storeInfo.hide();
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

  app.directive('storeInfo', function() {
    var StoreInfo = function(s, e, a) {
      this.scope = s;
      this.element = e;
      this.attrs = a;
      this.show = function() {
        this.element.css('display', 'block');
        this.scope.$apply();
      }
      this.hide = function() {
        this.element.css('display', 'none');
      }
    };
    return {
      templateUrl: 'store-info.html',
      link: function(scope, e, a) {
        scope.storeInfo= new StoreInfo(scope, e, a);
      }
    }
  });