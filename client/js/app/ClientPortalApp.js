'use strict';

var basePath = basePath || '';


angular.module('ClientPortalApp', [
  'ngCookies',
  'ngRoute'
])
.controller('MenuController', ['$scope', function($scope) {
  $scope.getClass = function(path) {
    var urlPath = window.location.hash.substr(1);
    return urlPath === path ? "active" : "";
  };
}])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: basePath + 'views/home.php',
      controller: 'HomeCtrl'
    })
    .when('/collateral', {
      templateUrl: basePath + 'views/collateral.php',
      controller: 'CollateralCtrl'
    })
    .when('/requestQuote', {
      templateUrl: basePath + 'views/requestQuote.php',
      controller: 'RequestQuoteCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
}])
.run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {
  //console.log($location.host());
  
  /*
  $rootScope.adminData = $cookieStore.get('clientData');
  if ($rootScope.adminData === undefined) {
    window.location.href = './login.php';
    return; 
  }
  */
  
  
  // web service
  var forceStaging = false;
  
  switch ($location.host()) {
    case 'wonderland-cp.stagebot.net':
      $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      $rootScope.wsUploadURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php';
      $rootScope.wsDropboxURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php';
      break;
    case 'bach':
      $rootScope.wsURL = 'http://bach/wonderland-cp/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      $rootScope.wsUploadURL = 'http://bach/wonderland-cp/webservice/WPLAdmin.php';
      $rootScope.wsDropboxURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      break;
    case 'localhost':
      $rootScope.wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
      $rootScope.wsUploadURL = 'http://localhost:81/wonderlandws/WPLAdmin.php';
      $rootScope.wsDropboxURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      break;
  }

  $rootScope.jsonHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

  
}])



;