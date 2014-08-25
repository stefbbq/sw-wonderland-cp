'use strict';

angular.module('wplAdmin')
  .controller('EditAdminUserCtrl', ['$scope', '$http', '$location', '$rootScope', 'adminUserService', function ($scope, $http, $location, $rootScope, adminUserService) {
    var addMode;
    var action;
    
    $scope.form = {};
    $scope.user = {};
    
      function construct() {
        initializeTestData();
        
        switch ($location.path()) {
            case '/addAdminUser': 
              addMode = true;
              $scope.title = 'Add New Admin User';
              action = 'addAdminUser'; 
              break;
            case '/editAdminUser': 
              addMode = false;
              $scope.title = 'Edit Admin User';
              action = 'updateAdminUser'; 
              $scope.adminUserService = adminUserService;
              loadAdminUserDetails();
              break;
        }
      }
      
      function loadAdminUserDetails() {
        var id = $location.search().id;
        $scope.adminUserService.loadDetails(id, function(details) {
          angular.copy(details, $scope.user);
        });
      }
     
      $scope.save = function(user) {
        user = angular.copy($scope.user);
        user.action = action;
        
        adminUserService.save(user, action, function() {
          var msg;
          if (addMode) {
            msg = 'Admin user added';
          } else {
            msg = 'Admin user updated';
          }
          alert(msg);
          $location.path('listAdminUsers');
        });
        
      };
      
      $scope.cancel = function() {
          window.history.back();
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
          testDataList.push(new AdminUser('admin', 'admin@wpl.com'));
      }
      
      function AdminUser(username, email) {
        var me = {};
        me.username     = username;
        me.email        = email;
       
        return me;
      }
      
      

      construct();
  }])
  

  
  ;

