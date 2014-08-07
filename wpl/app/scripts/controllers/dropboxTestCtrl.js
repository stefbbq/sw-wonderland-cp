'use strict';

/**
 * @ngdoc function
 * @name wplAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wplAdminApp
 */
// ['ui.mask']
angular.module('wplAdmin')
  .controller('DropBoxTestCtrl', [
    '$scope', 
    '$http', 
    '$location', 
    '$rootScope', 
    '$upload', 
    '$timeout',
    'collateralService', 
function ($scope, $http, $location, $rootScope, $upload, $timeout, collateralService) {
  $scope.collateral = {name:'Test File'};

    function construct() {
      $scope.collateralService = collateralService;
    }

    $scope.file = {file:null};
    $scope.onFileSelect = function($files) {
      console.log('file', $files);
      //$scope.collateral.file = $files[0];
      $scope.file.file = $files[0];
    };

    
    function onProgress(e) {
      console.log("onProgress", e);
    }
    
    
    $scope.save = function() {
      console.log($scope.file.file);
      collateralService.saveToDropbox($scope.collateral, $scope.file.file, onProgress,
      function() {
        var msg = 'collateral added to dropbox';
          alert(msg);
          //$location.path('/clientDetail').search({id:$scope.collateral.client_id});
      });
     
    };
 

    $scope.cancel = function() {
        window.history.back();
    };

    var testDataIndex = 0;
    $scope.autofill = function() {
        var testData = testDataList[testDataIndex++];
        angular.copy(testDataIndex, $scope.company);
        if (testDataIndex >= testDataList.length) {
            testDataIndex = 0;
        }
    };

    var testDataList = [];
    function initializeTestData() {
        testDataList.push(new Client('Oscorp', 'norman.osborne@oscorp.com'));
    }

    function Client(name, email) {
      var me = {};
      me.name         = name;
      me.address      = '100 This St.';
      me.city         = 'Anytown';
      me.province     = 'ON';
      me.postalCode   = 'H1H 1H1';
      me.email        = email;
      me.phone1       = '5555555555';
      me.phone2       = '5555555556';
      me.repEmail     = 'wplAccount@wpl.com';

      return me;
    }

    construct();
  }]);

