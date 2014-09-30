'use strict';
angular.module('LoginApp', [
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
      $rootScope.wsURL = 'http://bach/wonderland-cp/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';      
      break;
    case 'localhost':
      $rootScope.wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      break;
  }

  $rootScope.jsonHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

})
.controller('LoginFormCtrl', ['$scope', '$rootScope', '$cookieStore', 'loginService', function($scope, $rootScope, $cookieStore, loginService) {
    $scope.login = function() {
      loginService.login($scope.user.email, $scope.user.password, function(result) {
        if (result.success) {
          var data = {client_id:result.data.client_id, user_id:result.data.user_id};
          $cookieStore.put('clientData', data);
          location.href = './';
        } else {
          alert('Login Failed');
        }
        
      });
    };

}])
.factory('loginService', ['$http', '$rootScope', function($http, $rootScope) {

  function login(email, password, callback) {
    var args = {action:'clientLogin', email:email, password:md5(password)};
    $http.jsonp($rootScope.wsURL,
    {
      params:args,
      headers: $rootScope.jsonHeader
    }).success(function(result) {
      if (callback) callback(result);
    }).error(function(err) {
      console.log('error', err);
    });
  }

  return {
    login:login
  };
}]);
