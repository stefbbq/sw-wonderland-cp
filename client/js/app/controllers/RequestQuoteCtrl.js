angular.module('ClientPortalApp')
.controller('RequestQuoteCtrl', ['$scope', '$rootScope', 'ClientService', function($scope, $rootScope, ClientService) {

    var ws = $scope.ws = ClientService;
    $scope.quote = {};
    
    function construct() {
      ws.getDropdownContent();
    }
    
    $scope.submit = function(quote) {
      showModal();
      $scope.quote.userID = $rootScope.userID;
      ws.submitQuoteRequest($scope.quote, file, onUploadProgress, onQuoteSubmitted);
    };
    
    $scope.formatValue = function(val) {
      return val + "_a";
    };
    
    function onUploadProgress(e) {
      console.log('onUploadProgress', e);
    }
    
    function onQuoteSubmitted() {
      alert("Thank you for your submission.");
      hideModal();
      angular.copy({}, $scope.quote);
      window.history.back();
    }
    
    $scope.formValidClass = function(invalid) {
      if (invalid) {
        return 'disabled';
      }
    };
    
    var file;
    $scope.onFileSelect = function(files) {
      file = files[0];
      console.log('onFileSelect', file);
    };
    
    $scope.autoFill = function() {
      $scope.quote.type = ws.dd.type[9].id;
      $scope.quote.size = '8x10';
      $scope.quote.quantity = '1000';
      $scope.quote.pageCount = '1';
      $scope.quote.finish = ws.dd.finish[0].id;
      $scope.quote.weight = ws.dd.weight[1].id;
      $scope.quote.recycled = ws.dd.recycle[0].id;
      $scope.quote.colours = ws.dd.colours[1].id;
      $scope.quote.sides = '1';
      $scope.quote.specialFX = ws.dd.sfx[0].id;
      $scope.quote.binding = ws.dd.binding[0].id;
      $scope.quote.description = 'Autofilled content.';
      
      
    }
    
    construct();
}])
;