'use strict';

/*
 * Controllers
 */
angular.module('wplAdmin')
/*
 * Client Detail
 */
.controller('ClientUserDetailCtrl', ['$scope', '$location', 'clientUserService', function($scope, $location, clientUserService) {
    $scope.clientUserService = clientUserService;

    var id = $location.search().id;
    var active;
    
    function construct() {
      setActiveStatus(true);
    }
    
    // load detail
    $scope.details = clientUserService.details;
    clientUserService.loadDetails(id, function(data) {
      setActiveStatus(data.active === '1');
    });

    $scope.showClient = function(id) {
      $location.path('/clientDetail').search({id:id});
    };
    
    
    function setActiveStatus(value) {
      active = value;
      $scope.activeStatusLabel = active ? "Deactivate User" : "Reactivate User";
    }
    
    // edit button
    $scope.edit = function() {
      $location.path('/editClientUser').search({id:id, companyID:clientUserService.client.guid});
    };
    
    // reset password
    $scope.resetPassword = function() {
      alert("Will generate a new password and email a reset link to the user's email address.");
    };

    
    // active status button
    $scope.changeActiveStatus = function() {
      if (active) {
        if (confirm('Are you sure you want to deactivate this user?')) {
          clientUserService.deactivate(id, function() {
            setActiveStatus(false);
            alert('Client user deactivated');
          });
        }
      } else {
        clientUserService.reactivate(id, function() {
          setActiveStatus(true);
          alert('Client user reactivated');
        });
      }
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
