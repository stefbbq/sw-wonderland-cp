'use strict';
angular.module('wplLogin', [
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
    case 'localhost':
      $rootScope.wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
      if (forceStaging) $rootScope.wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
      break;
  }

  $rootScope.jsonHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

})
.controller('loginController', ['$scope', '$rootScope', '$cookieStore', 'loginService', function($scope, $rootScope, $cookieStore, loginService) {
    $scope.login = function() {
      loginService.login($scope.user.username, $scope.user.password, function(result) {
        if (result.success) {
          var data = {isAdmin:true, id:result.data.guid, superUser:result.data.super_user == '1'};
          $cookieStore.put('adminData', data);
          location.href = './';
        } else {
          alert('Login Failed');
        }
        
      });
    };

}])
.factory('loginService', ['$http', '$rootScope', function($http, $rootScope) {

  function login(username, password, callback) {
    var args = {action:'adminLogin', username:username, password:md5(password)};
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
