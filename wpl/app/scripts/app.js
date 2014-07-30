'use strict';

/*
 * 
 * TODO: move login status to server session variable, and do redirects on the back-end.
 */

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
    'ui.mask',
    'angularFileUpload'
  ])
  .config(['$routeProvider', function ($routeProvider) {
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
      .when('/changeAdminPassword', {
        templateUrl: basePath + 'views/changeAdminPassword' + viewExt,
        controller: 'ChangeAdminPasswordCtrl'
      })
      .when('/listAdminUsers', {
        templateUrl: basePath + 'views/listAdminUsers' + viewExt,
        controller: 'AdminListCtrl'
      })
      .when('/addCollateral', {
        templateUrl: basePath + 'views/editCollateral' + viewExt,
        controller: 'EditCollateralCtrl'
      })
      .when('/editCollateral', {
        templateUrl: basePath + 'views/editCollateral' + viewExt,
        controller: 'EditCollateralCtrl'
      })
      .when('/collateralDetail', {
        templateUrl: basePath + 'views/collateralDetail' + viewExt,
        controller: 'CollateralDetailCtrl'
      })
      .otherwise({
        redirectTo: '/listClients'
      });
  }])
  .run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {
    //console.log($location.host());
    
    $rootScope.adminData = $cookieStore.get('adminData');
    if ($rootScope.adminData === undefined || !$rootScope.adminData.isAdmin) {
      window.location.href = './login.html';
      return; 
    }
    
    // web service
    var forceStaging = false;
    
    switch ($location.host()) {
      case 'wonderland-cp.stagebot.net':
        $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
        break;
      case 'localhost':
        $rootScope.wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
        $rootScope.wsUploadURL = 'http://localhost:81/wonderlandws/WPLAdmin.php';
        if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
        break;
    }

    $rootScope.jsonHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

    // settings
    $rootScope.clientList = {
      pageSize:3
    };
    $rootScope.collateralList = {
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
    
  }])
  
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

