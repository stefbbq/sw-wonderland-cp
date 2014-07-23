'use strict';

/*
 * Controllers
 */
angular.module('wplAdmin')
/*
 * Client Detail
 */
.controller('ClientDetailCtrl', ['$scope', '$location', 'clientDetailService', function($scope, $location, clientDetailService) {
    $scope.clientDetailService = clientDetailService;
    $scope.clientDetails = clientDetailService.clientDetails;
    
    // load detail
    clientDetailService.loadDetails($location.search().id);
    
    // edit button
    $scope.editClient = function() {
      $location.path('editClient').search({id:$location.search().id});
    };
    
    
    
}])
.controller('UserSearchCtrl', ['$scope', function($scope) {
    var a = $scope;
}])
.controller('CollateralSearchCtrl', ['$scope', function($scope) {
    var a = $scope;
}]);


/*
 * Factories
 */
