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
      location.reload();
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
      $scope.quote.type = ws.dropdown.type[9].id;
      $scope.quote.size = '24 x 30';
      $scope.quote.flatSize = '24 x 30 flat';
      $scope.quote.foldedSize = '24 x 30 folded';
      $scope.quote.quantity = '1000';
      $scope.quote.pageCount = '1';
      $scope.quote.coatingAQ = ws.dropdown.coatingAQ[0].id;
      $scope.quote.coatingVarnish = ws.dropdown.coatingVarnish[0].id;
      $scope.quote.finish = ws.dropdown.finish[0].id;
      $scope.quote.weightText = ws.dropdown.weightText[1].id;
      $scope.quote.weightCover = ws.dropdown.weightCover[1].id;
      $scope.quote.recycled = ws.dropdown.recycle[0].id;
      $scope.quote.colours = ws.dropdown.colours[1].id;
      $scope.quote.sides = ws.dropdown.sides[1].id;
      $scope.quote.specialFX = ws.dropdown.sfx[0].id;
      $scope.quote.binding = ws.dropdown.binding[0].id;
      $scope.quote.description = 'A poster for my room!';
      
    }
    
    construct();
}])
;