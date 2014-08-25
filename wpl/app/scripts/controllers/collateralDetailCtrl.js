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
      console.log(clientService.details);
      $location.path('/editCollateral').search({id:id, companyID:clientService.details.guid});
    };
    
    
    // active status button
    $scope.changeActiveStatus = function() {
      if (active) {
        if (confirm('Are you sure you want to deactivate this collateral?')) {
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

