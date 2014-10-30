angular.module('ClientPortalApp')
.controller('RequestQuoteCtrl', ['$scope', '$rootScope', 'ClientService', function($scope, $rootScope, ClientService) {

    var ws = $scope.ws = ClientService;
    $scope.quote = {
      sides:'',
      ink:'',
      coatingAQ:'',
      coatingVarnish:'',
      weightText:'',
      weightCover:'',
      paperFinish:'',
      finishing:''
    };
    
    function construct() {
      ws.getDropdownContent();
    }
    
    $scope.submit = function() {
      showModal();
      $scope.quote.userID = $rootScope.userID;

      var quote = {};
      for (var a in $scope.quote) {
        if ($scope.quote[a] != '') quote[a] = $scope.quote[a];
      }

      ws.submitQuoteRequest(quote, file, onUploadProgress, onQuoteSubmitted);
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
      $scope.quote.quantity = '1';
      $scope.quote.description = 'A poster for my bunk';
      $scope.quote.flatSize = '24 x 30 flat';
      $scope.quote.foldedSize = '12 x 15 folded';
      $scope.quote.sides  = ws.dropdown.sides[1].code;
      $scope.quote.ink    = ws.dropdown.ink[1].code;
      $scope.quote.coatingAQ = ws.dropdown.coatingAQ[3].code;
      $scope.quote.coatingVarnish = ws.dropdown.coatingVarnish[2].code;
      $scope.quote.weightText = ws.dropdown.weightText[2].code;
      $scope.quote.weightCover = ws.dropdown.weightCover[1].code;
      $scope.quote.paperFinish = ws.dropdown.paperFinish[1].code;
      $scope.quote.finishing = ws.dropdown.finishing[1].code;
      $scope.quote.finishingReq = 'Make it shiny';
      $scope.quote.specialInstructions = 'Make it look nice';
      
    }
    
    construct();
}])
;