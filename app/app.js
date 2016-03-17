//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []); 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Home', {
        templateUrl: 'view/home.php',
        controller:'mainController'
    }).
      otherwise({
        redirectTo: '/Home'
      });
}]);
 
 
sampleApp.controller('mainController', function($scope) {
   alert("hallo");  
});
