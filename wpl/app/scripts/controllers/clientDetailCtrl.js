'use strict';

/*
 * Controllers
 */
angular.module('wplAdmin')
.controller('ClientDetailCtrl', ['$scope', function($scope) {
    
}])
.controller('UserSearchCtrl', ['$scope', function($scope) {
    
}])
.controller('CollateralSearchCtrl', ['$scope', function($scope) {
    
}]);


/*
 * Factories
 */
angular.module('wplAdmin')
/*
 * Client Details
 */
.factory('clientDetailService', ['$http', '$location', '$rootScope', function($http, $location, $rootScope) {
  
  var clientDetails = {};
  var users = [];
  var collateral = [];
  
  function loadDetails() {
    
  }
  
  function loadClients(start) {
    
  }
  
  function loadCollateral(start) {
    
  }
    
}]);
