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
  .controller('EditClientUserCtrl', ['$scope', '$http', '$location', '$rootScope', 'clientUserService', function ($scope, $http, $location, $rootScope, clientUserService) {
    var addMode;
    var action;
    var companyID = $location.search().companyID;
    //console.log(companyID);
    
    $scope.form = {};
    $scope.user = {};
    
      function construct() {
        initializeTestData();
        
        switch ($location.path()) {
            case '/addClientUser': 
              addMode = true;
              $scope.title = 'Add New Client User';
              action = 'addClientUser'; 
              break;
            case '/editClientUser': 
              addMode = false;
              $scope.title = 'Edit Client User';
              action = 'updateClientUser'; 
              $scope.clientUserService = clientUserService;
              loadClientUserDetails();
              break;
        }
      }
      
      function loadClientUserDetails() {
        var id = $location.search().id;
        $scope.clientDetailService.loadDetails(id, function(details) {
          angular.copy(details, $scope.company);
        });
      }
      
      $scope.save = function(user) {
        var params = angular.copy($scope.user);
        params.action = action;
        params.company_id = companyID;
        
        $http.jsonp($rootScope.wsURL, 
        {
          params : params,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data) {
          console.log('success', data);
          var msg;
          if (addMode) {
            msg = 'user added';
          } else {
            msg = 'user updated';
          }
          alert(msg);
          $location.path('clientDetail').search({id:companyID});
        })          
        .error (function(data) {
          console.log('error', data);
        });






        //$scope.master = angular.copy(company);
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
          testDataList.push(new ClientUser('Test', 'User', 'testUser@company.com'));
      }
      
      function ClientUser(firstName, lastName, email) {
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

