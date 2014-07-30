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
  .controller('EditCollateralCtrl', [
    '$scope', 
    '$http', 
    '$location', 
    '$rootScope', 
    '$cookieStore', 
    '$upload', 
    '$timeout',
    'collateralService', 
    'clientService', 
    function ($scope, $http, $location, $rootScope, $cookieStore, $upload, $timeout, collateralService, clientService) {
  var addMode;
  var action;

  $scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);

  $scope.collateral = {};

    function construct() {
      //initializeTestData();
      $scope.clientService = clientService;
      $scope.collateralService = collateralService;


      switch ($location.path()) {
          case '/addCollateral': 
            addMode = true;
            $scope.title = 'Add New Collateral';
            action = 'addCollateral'; 
            break;
          case '/editCollateral': 
            addMode = false;
            $scope.title = 'Edit Collateral';
            action = 'updateCollateral'; 
            loadDetails();
            break;
      }

      loadClients();
      loadTypes();
    }

    function loadClients() {
      $scope.clientService.loadListAll(function(list) {
      });
    }

    function loadTypes() {
      $scope.collateralService.loadTypeList(function(list) {
      });
    }

    function loadDetails() {
      var id = $location.search().id;
      $scope.collateralService.loadDetails(id, function(details) {
        angular.copy(details, $scope.collateral);
      });
    }

    $scope.thumb = {file:null, image:''};
    $scope.onThumbSelect = function($files) {
      var file = $files[0];
      $scope.thumb.file = file;
      $scope.collateral.thumbFile = $files[0];

			if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(file);
				var loadFile = (function(fileReader) {
					fileReader.onload = function(e) {
						$timeout(function() {
              $scope.thumb.image = e.target.result;
              $scope.$apply();
						});
					};
				})(fileReader);
			}
      
      
    };
    
    $scope.file = {file:null};
    $scope.onFileSelect = function($files) {
      console.log('file', $files);
      $scope.collateral.file = $files[0];
      $scope.file.file = $files[0];
      
    };

/*
 * // causes a protocol not defined error; need to complete.
    
          */
    $scope.filesSelected = function() {
      return $scope.thumb.file !== null;
      
      //return $scope.file.file !== null && $scope.thumb.file !== null;
    };
    
    function onProgress(e) {
      console.log("onProgress", e);
    }
    
    
    $scope.save = function() {
      collateralService.save($scope.collateral, action, onProgress,
      function() {
        var msg;
        if (addMode) {
          msg = 'collateral added';
          alert(msg);
          //$location.path('/clientDetail').search({id:$scope.collateral.client_id});
        } else {
          msg = 'collateral updated';
          alert(msg);
          //$location.path('/clientDetail').search({id:$scope.collateral.client_id});
        }          
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

