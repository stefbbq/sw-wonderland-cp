angular.module('ClientPortalApp')
.controller('CollateralCtrl', ['$scope', '$location', 'ClientService', function($scope, $location, ClientService) {
  $scope.ws = ClientService;
  initialize_tableSort();
  
  ClientService.loadCollateralList();
  
  // table sorting
  function initialize_tableSort() {
    $scope.orderByField = 'name';
    $scope.reverseSort = false;
  }
  
  // order
  $scope.orderItem = function(id) {
    $location.path('/order').search({id:id});
  }


}])
.controller('CollateralSearchCtrl', ['$scope', '$http', function($scope, $http) {


}])

;