'use strict';

/*
 * Controllers
 */
angular.module('wplAdmin')
/*
 * Client Detail
 */
.controller('ClientDetailCtrl', ['$scope', '$location', 'clientService', 'clientUserService', function($scope, $location, clientService, clientUserService) {
    $scope.clientService = clientService;
    $scope.clientUserService = clientUserService;
    
    function construct() {
      setClientActiveStatus(true);
    }
    
    var id = $location.search().id;
    var clientActive;
    
    // load detail
    $scope.clientDetails = clientService.clientDetails;
    clientService.loadDetails(id, function(data) {
      setClientActiveStatus(data.active === '1');
    });
    
    // Load user list
    $scope.users = clientUserService.users;
    clientUserService.loadList(id, function() {
      
    });
    
    $scope.showClientUser = function(id) {
      $location.path('/clientUserDetail').search({id:id});
    };
    
    
    function setClientActiveStatus(value) {
      clientActive = value;
      $scope.activeStatusLabel = clientActive ? "Deactivate Client" : "Reactivate Client";
    }
    
    // edit button
    $scope.editClient = function() {
      $location.path('editClient').search({id:id});
    };
    
    // active status button
    $scope.changeActiveStatus = function() {
      if (clientActive) {
        if (confirm('Are you sure you want to deactivate this client?')) {
          clientService.deactivate(id, function() {
            setClientActiveStatus(false);
            alert('Client deactivated');
          });
        }
      } else {
        clientService.reactivate(id, function() {
          setClientActiveStatus(true);
          alert('Client reactivated');
        });
      }
    };
    
    // add user
    $scope.addUser = function() {
      $location.path('addClientUser').search({companyID:id});
    };
    
    
    construct();
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
