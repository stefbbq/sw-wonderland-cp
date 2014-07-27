'use strict';
var basePath = basePath || '';
var viewExt = viewExt || '.html';
/**
 * @ngdoc overview
 * @name wplAdminApp
 * @description
 * # wplAdminApp
 *
 * Main module of the application.
 */
angular
  .module('wplAdmin', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.mask'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listClients', {
        templateUrl: basePath + 'views/listClients' + viewExt,
        controller: 'ClientListCtrl'
      })
      .when('/addClient', {
        templateUrl: basePath + 'views/editClient' + viewExt,
        controller: 'EditClientCtrl'
      })
      .when('/editClient', {
        templateUrl: basePath + 'views/editClient' + viewExt,
        controller: 'EditClientCtrl'
      })
      .when('/addClientUser', {
        templateUrl: basePath + 'views/editClientUser' + viewExt,
        controller: 'EditClientUserCtrl'
      })
      .when('/editClientUser', {
        templateUrl: basePath + 'views/editClientUser' + viewExt,
        controller: 'EditClientUserCtrl'
      })
      .when('/clientDetail', {
        templateUrl: basePath + 'views/clientDetail' + viewExt,
        controller: 'ClientDetailCtrl'
      })
      .when('/clientUserDetail', {
        templateUrl: basePath + 'views/clientUserDetail' + viewExt,
        controller: 'ClientUserDetailCtrl'
      })
      .when('/addAdminUser', {
        templateUrl: basePath + 'views/editAdminUser' + viewExt,
        controller: 'EditAdminUserCtrl'
      })
      .when('/editAdminUser', {
        templateUrl: basePath + 'views/editAdminUser' + viewExt,
        controller: 'EditAdminUserCtrl'
      })
      .otherwise({
        redirectTo: '/listClients'
      });
  })
  .run(function ($rootScope, $location) {
    //console.log($location.host());
    
    // web service
    var forceStaging = false;
    
    switch ($location.host()) {
      case 'wonderland-cp.stagebot.net':
        $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
        break;
      case 'localhost':
        $rootScope.wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
        if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
        break;
    }

    $rootScope.jsonHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

    // settings
    $rootScope.clientList = {
      pageSize:3
    };
    
    $rootScope.getFormVars = function(model) {
      var result = {};
      for (var a in model ) {
        if (isNaN(Number(a))) {
          result[a] = model[a];
        }
      }
      return result;
    };
    
  })
  
  .controller('MenuController', ['$scope', function($scope) {
          
    /*
     * ~§~ Determine the currently selected menu button.
     */
    $scope.getClass = function(path) {
        var urlPath = window.location.hash.substr(1);
        
        if (urlPath === path) {
          return 'active';
        } else {
          return '';
        }
    };
    
    
  }]);

