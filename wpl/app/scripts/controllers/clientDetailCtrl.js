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
    
    setClientActiveStatus(true);
    var clientID = $location.search().id;
    var clientActive;
    
    // load detail
    $scope.clientDetails = clientService.clientDetails;
    clientService.loadDetails(clientID, function(data) {
      setClientActiveStatus(data.active === '1');
    });
    
    // Load user list
    $scope.users = clientUserService.users;
    clientUserService.loadList(clientID, function() {
      
    });
    
    $scope.editUser = function(id) {
      alert(id);
    };
    
    
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
          clientService.deactivate(clientID, function() {
            setClientActiveStatus(false);
            alert('Client deactivated');
          });
        }
      } else {
        clientService.reactivate(clientID, function() {
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
