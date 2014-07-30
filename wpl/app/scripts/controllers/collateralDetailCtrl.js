'use strict';

/*
 * Controllers
 */
angular.module('wplAdmin')
/*
 * Client Detail
 */
.controller('CollateralDetailCtrl', ['$scope', '$location', 'collateralService', 'clientService', function($scope, $location, collateralService, clientService) {
    $scope.collateralService = collateralService;
    $scope.clientService = clientService;

    var id = $location.search().id;
    var clientID = $location.search().clientID;
    var active;
    
    function construct() {
      setActiveStatus(true);
      loadClientDetails();
      loadCollateralDetails();
    }

    function loadClientDetails() {
      clientService.loadDetails(clientID, function(data) {
      });
    }
    
    function loadCollateralDetails() {
      // load detail
      collateralService.loadDetails(id, function(data) {
        setActiveStatus(data.active === '1');
        var label = collateralService.getCollateralTypeLabel(data.type);
        collateralService.details.type = collateralService.getCollateralTypeLabel(data.type);
      });
    }

    $scope.showClient = function(id) {
      $location.path('/clientDetail').search({id:id});
    };
    
    
    function setActiveStatus(value) {
      active = value;
      $scope.activeStatusLabel = active ? "Deactivate" : "Reactivate";
    }
    
    // edit button
    $scope.edit = function() {
      $location.path('/editCollateral').search({id:id, companyID:clientService.client.guid});
    };
    
    // reset password
    $scope.resetPassword = function() {
      alert("Will generate a new password and email a reset link to the user's email address.");
    };

    
    // active status button
    $scope.changeActiveStatus = function() {
      if (active) {
        if (confirm('Are you sure you want to deactivate this user?')) {
          collateralService.deactivate(id, function() {
            setActiveStatus(false);
            alert('Collateral deactivated');
          });
        }
      } else {
        collateralService.reactivate(id, function() {
          setActiveStatus(true);
          alert('Collateral reactivated');
        });
      }
    };
    
    
    construct();
}]);

