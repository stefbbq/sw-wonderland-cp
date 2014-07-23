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
  .controller('EditClientCtrl', ['$scope', '$http', '$location', '$rootScope', 'clientDetailService', function ($scope, $http, $location, $rootScope, clientDetailService) {
    var addMode;
    $scope.form = {};
    
      function construct() {
        initializeCompany();
        initializeTestClients();
        
        switch ($location.path()) {
            case '/addClient': 
              addMode = true;
              $scope.title = "Add New Client";
              $scope.form.action = 'addClient'; 
              $scope.company.guid = ''; 
              break;
            case '/editClient': 
              addMode = false;
              $scope.title = "Edit Client";
              $scope.form.action = 'updateClient'; 
              $scope.clientDetailService = clientDetailService;
              loadClientDetails();
              break;
        }
      }
      
      function loadClientDetails() {
        var id = $location.search().id;
        $scope.clientDetailService.loadDetails(id, function(details) {
          angular.copy(details, $scope.company);
        });
      }
      
      $scope.save = function(company) {
        var params = $rootScope.getFormVars(company);
        params.action = $scope.form.action;
        
        $http.jsonp($rootScope.wsURL, 
        {
          params : params,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data) {
          console.log('success', data);
          var msg;
          if (addMode) {
            msg = 'company added';
          } else {
            msg = 'company updated';
          }
          alert(msg);
        })          
        .error (function(data) {
          console.log('error', data);
        });






        //$scope.master = angular.copy(company);
      };
      
      $scope.cancel = function() {
          // redirect back.
      };
      
      var clientIndex = 0;
      $scope.autofill = function() {
          var testCompany = testClients[clientIndex++];
          for (var a in testCompany) {
              $scope.company[a] = testCompany[a];
          }
          if (clientIndex >= testClients.length) {
              clientIndex = 0;
          }
      };
      
      var testClients = [];
      function initializeTestClients() {
          testClients.push(new Client('Oscorp', 'norman.osborne@oscorp.com'));
          testClients.push(new Client('Extensive Enterprises', 'tomax@extensiveenterprises.com'));
          testClients.push(new Client('Daily Planet', 'lois.lane@dailyplanet.com'));
          testClients.push(new Client('Daily Bugle', 'jjjameson@dailybugle.com'));
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
      
      function initializeCompany() {
        $scope.company = {
            id:'',
            name:'',
            address:'',
            city:'',
            province:'',
            postalCode:'',
            email:'',
            phone1:'',
            phone2:'',
            repEmail:''
        };
      }

      construct();
  }])
  

  
  ;

