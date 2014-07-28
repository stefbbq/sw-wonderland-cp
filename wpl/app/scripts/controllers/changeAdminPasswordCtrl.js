'use strict';

angular.module('wplAdmin')
  .controller('ChangeAdminPasswordCtrl', ['$scope', '$http', '$location', '$rootScope', 'adminUserService', function ($scope, $http, $location, $rootScope, adminUserService) {
    var addMode;
    var action;
    
    $scope.adminUserService = adminUserService;
    
    $scope.form = {};
    $scope.user = {};
    
    var id = $location.search().id;

    function construct() {
      initializeTestData();
      
      adminUserService.loadDetails(id, function(data) {
        //angular.copy(data, $scope.user)
      });
      
    }

    

    $scope.save = function() {
      var payload = angular.copy($scope.passwords);
      payload.old_password = md5(payload.old_password);
      payload.password = md5(payload.password);
      payload.id = id;

      adminUserService.changePassword(payload, function(response) {
        var msg = response.message;
        alert(msg);
        if (response.success) {
          $location.path('clientList');
        }
      });

    };

    var testDataIndex = 0;
    $scope.autofill = function() {
        var testData = testDataList[testDataIndex++];
        angular.copy(testData, $scope.user);
        if (testDataIndex >= testDataList.length) {
            testDataIndex = 0;
        }
    };

    var testDataList = [];
    function initializeTestData() {
        testDataList.push(new PasswordSet('admin', 'admin@wpl.com'));
    }

    function PasswordSet(oldPassword, newPassword) {
      var me = {};
      me.old_password    = oldPassword;
      me.password        = newPassword;

      return me;
    }



    construct();
  }])
  

  
  ;

