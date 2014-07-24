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
    
    var clientID = $location.search().id;
    var clientActive;
    
    // load detail
    clientDetailService.loadDetails(clientID, function(data) {
      setClientActiveStatus(data.active == '1');
    });
    
    function setClientActiveStatus(value) {
      clientActive = value;
      $scope.activeStatusLabel = clientActive ? "Deactivate Client" : "Reactivate Client";
    }
    
    // edit button
    $scope.editClient = function() {
      $location.path('editClient').search({id:clientID});
    };
    
    // active status button
    $scope.changeActiveStatus = function() {
      if (clientActive) {
        if (confirm('Are you sure you want to deactivate this client?')) {
          clientDetailService.deactivate(clientID, function() {
            setClientActiveStatus(false);
            alert('Client deactivated');
          });
        }
      } else {
        clientDetailService.reactivate(clientID, function() {
          setClientActiveStatus(true);
          alert('Client reactivated');
        });
      }
    }
    
    // add user
    $scope.addUser = function() {
      $location.path('addClientUser').search({companyID:clientID});
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
