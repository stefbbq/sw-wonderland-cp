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
    .when('/order', {
      templateUrl: basePath + 'views/orderCollateral.php',
      controller: 'OrderCollateralCtrl'
    })
    .when('/requestQuote', {
      templateUrl: basePath + 'views/requestQuote.php',
      controller: 'RequestQuoteCtrl'
    })
    .when('/logout', {
      templateUrl: basePath + 'views/logout.php',
      controller: 'LogoutCtrl'
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

  /*
   * Store client id
   */
   
  var clientData = $cookieStore.get('clientData');
  if (!clientData) {
    clientData = {client_id:'eb14a744-6711-47fa-b4fc-206f57c091b3', user_id:'593721c8-f7d1-4021-af8a-865b747897a2'};
  }  
  
  $rootScope.clientID = clientData.client_id;
  $rootScope.userID = clientData.user_id;
  
  // web service
  var forceStaging = true;
  
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
.controller('LogoutCtrl', ['$scope', '$cookieStore', function($scope, $cookieStore) {
  $cookieStore.remove('clientData');
  alert("You are now logged out.");
  location.href = './login.php';

}])

.controller('CompanyInfoController', ['$scope', '$cookieStore', 'ClientService', function($scope, $cookieStore, ClientService) {
  $scope.ws = ClientService;
  $scope.ws.loadDetail();  
}])



;

function showModal() {
	$('#modal').removeClass('hidden');
}

function hideModal() {
	$('#modal').addClass('hidden');
}