'use strict';
angular.module('wplForgotPassword', [
    'ngCookies'
  ]
)
.run(function ($rootScope, $location) {
  //console.log($location.host());

  // web service
  var forceStaging = false;

  switch ($location.host()) {
    case 'wonderland-cp.stagebot.net':
      $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      break;
    case 'bach':
      $rootScope.wsURL = 'http://bach/wonderland-cp/webserviceWPLAdmin.php?callback=JSON_CALLBACK';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';      
      break;
    case 'localhost':
      $rootScope.wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      break;
  }

  $rootScope.jsonHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

})
.controller('forgotPasswordController', ['$scope', '$rootScope', '$cookieStore', 'wplService', function($scope, $rootScope, $cookieStore, wplService) {
  var user = $scope.user = {};
  var ws = $scope.wplService = wplService;
  var resultMessage = $scope.resultMessage = {message:''};
  
  $scope.requestReset = function() {
    ws.requestReset(user.email, function(result) {
      resultMessage.message = result.data.message;
      console.log(result);
    });
  };

}])
.factory('wplService', ['$http', '$rootScope', function($http, $rootScope) {
  
  var result = {message:'nothing to report yet'};

  function requestReset(email, callback) {
    var args = {action:'adminPasswordReset', email:email};
    $http.jsonp($rootScope.wsURL,
    {
      params:args,
      headers: $rootScope.jsonHeader
    }).success(function(wsResult) {
      angular.copy(wsResult, result);
      if (callback) callback(result);
    }).error(function(err) {
      console.log('error', err);
    });
  }

  return {
    requestReset:requestReset,
    result:result
  };
}]);
