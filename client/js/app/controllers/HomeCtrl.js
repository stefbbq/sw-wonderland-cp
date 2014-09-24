angular.module('ClientPortalApp')
.controller('HomeCtrl', ['$scope', '$sce', 'ClientService', function($scope, $sce, ClientService) {
  var ws = $scope.ws = ClientService;
  
  // sort table
  $scope.orderByField = 'order_date';
  $scope.reverseSort = false;
  
  ws.loadOrderHistory();
  
  ws.getLatestNews();
  
  
}])

.controller('OrderHistorySearchCtrl', ['$scope', 'ClientService', function($scope, ClientService) {
  var ws = $scope.ws = ClientService;
  
  $scope.doSearch = function() {
    var searchTerm = $scope.searchString;
    if (searchTerm || searchTerm.length > 0) {
      ws.searchOrderHistory(searchTerm);
    } else {
      ws.loadOrderHistory();
    }
    
  }
  
}])
;