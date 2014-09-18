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
.controller('CollateralSearchCtrl', ['$scope', 'ClientService', function($scope, ClientService) {
  var ws = $scope.ws = ClientService;
  
  $scope.doSearch = function() {
    var searchTerm = $scope.searchString;
    if (searchTerm || searchTerm.length > 0) {
      ws.searchCollateral(searchTerm);
    } else {
      ws.loadCollateralList();
    }
    
  }
  

}])

;