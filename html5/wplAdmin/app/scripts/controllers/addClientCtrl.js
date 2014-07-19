'use strict';

/**
 * @ngdoc function
 * @name wplAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wplAdminApp
 */
// ['ui.mask']
angular.module('wplAdminApp')
  .controller('AddClientCtrl', function ($scope, $http, $location) {
      function construct() {
        initializeCompany();
        initializeTestClients();
        
        switch ($location.path()) {
            case '/addClient': $scope.company.action = 'add'; break;
            case '/editClient': 
                $scope.company.action = 'edit'; 
                $scope.company.id = $location.search().id; 
                break;
        }
      }
      
      
      $scope.save = function(company) {
          //window.console.log(company);
          var url = 'http://localhost:81/wonderland/webservice/WPLAdmin.php?callback=JSON_CALLBACK';

          $http.jsonp(url, 
          {
              params:company,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .success(function(data) {
              console.log('success', data);
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
  })
  ;

