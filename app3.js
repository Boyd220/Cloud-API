//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []); 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Home', {
        templateUrl: 'view/home1.php',
        controller: 'mainController'
    }).
      when('/Map', {
        templateUrl: 'view/map1.php',
        controller: 'mapController'
      }).
      when('/Table', {
        templateUrl: 'view/table1.php',
        controller: 'tableController'
      }).
      otherwise({
        redirectTo: '/Home'
      });
}]);
 
 
sampleApp.controller('mainController', function($scope) {
     console.log("main");
     
});

sampleApp.controller('tableController', function($scope) {
  console.log("table");     
});

 
 
sampleApp.controller('mapController', function($scope) {


console.log("map");

  });


