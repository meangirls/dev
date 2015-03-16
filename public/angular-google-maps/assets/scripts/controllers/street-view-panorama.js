angular.module('app', ['uiGmapgoogle-maps'])
.controller('ctrl', ['$scope', "uiGmapLogger", "uiGmapGoogleMapApi", "$http",
  function ($scope, $log, uiGmapGoogleMapApi, $http) {
    $scope.map = {
      id: 1,
      center: {
        latitude: 34.05, 
        longitude: -118.25
      },
      zoom: 16,
      refresh: false,
      events: {},
      bounds: {},
      draw: undefined
    };
    $scope.map.marker = _.extend({}, $scope.map.center);
}])
.controller('PanCtrl',function(){

});

