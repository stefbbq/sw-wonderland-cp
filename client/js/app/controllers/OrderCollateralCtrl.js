angular.module('ClientPortalApp')
.controller('OrderCollateralCtrl', ['$scope', '$rootScope', '$location', 'ClientService', function($scope, $rootScope, $location, ClientService) {
  $scope.ws = ClientService;
  
  $scope.order = {};
  
  var collateralID = $location.search().id;
  
  ClientService.loadCollateralDetails(collateralID);
  
  $scope.submitOrder = function() {
    $scope.ws.submitOrder($rootScope.clientID, $rootScope.userID, collateralID, $scope.order.quantity, $scope.order.comment, function(result) {
      alert("Your order has been submitted.");
      window.history.back();
    });
  };
  
  $scope.cancel = function() {
    window.history.back();
  };
  

}])


/*
 * Directives
 */
.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$parsers.unshift(function (inputValue) {
                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                ngModel.$viewValue = digits;
                ngModel.$render();
                return digits;
            });
        }
    };
})

;