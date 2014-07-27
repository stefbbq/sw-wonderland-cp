'use strict';

angular.module('wplAdmin')
  .controller('EditAdminUserCtrl', ['$scope', '$http', '$location', '$rootScope', 'adminUserService', function ($scope, $http, $location, $rootScope, adminUserService) {
    var addMode;
    var action;
    var companyID = $location.search().companyID;
    //console.log(companyID);
    
    $scope.form = {};
    $scope.user = {};
    
      function construct() {
        initializeTestData();
        
        switch ($location.path()) {
            case '/addAdminUser': 
              addMode = true;
              $scope.title = 'Add New Admin User';
              action = 'addWPLUser'; 
              break;
            case '/editAdminUser': 
              addMode = false;
              $scope.title = 'Edit Admin User';
              action = 'updateWPLUser'; 
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
        alert('would save');
        return;
        
        user = angular.copy($scope.user);
        user.company_id = companyID;
        
        adminUserService.save(user, action, function() {
          var msg;
          if (addMode) {
            msg = 'user added';
          } else {
            msg = 'user updated';
          }
          alert(msg);
          $location.path('clientDetail').search({id:companyID});
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
          testDataList.push(new AdminUser('Test', 'User', 'testUser@company.com'));
      }
      
      function AdminUser(firstName, lastName, email) {
        var me = {};
        me.first_name     = firstName;
        me.last_name      = lastName;
        me.email          = email;
        me.confirm_email  = 'confirmationEmail@company.com';
        me.phone          = '5555555555';
        me.phone2         = '5555555556';
       
        return me;
      }
      
      

      construct();
  }])
  

  
  ;

