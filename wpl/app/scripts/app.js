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
  .directive('capitalizeFirst', function() {
      return {
          require: 'ngModel',
          link:function(scope, element, attrs, modelCtrl) {
              var capitalize = function(inputValue) {
                  if (inputValue !== undefined) {
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substr(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                } else {
                    return '';
                }
              };
              
              modelCtrl.$parsers.push(capitalize);
              capitalize(scope[attrs.ngModel]); // capitalize initial value
          }
          
      };
  })
  .directive('capitalize', function() {
      return {
          require: 'ngModel',
          link:function(scope, element, attrs, modelCtrl) {
              var capitalize = function(inputValue) {
                  if (inputValue !== undefined) {

                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                } else {
                    return '';
                }
              };
              
              modelCtrl.$parsers.push(capitalize);
              capitalize(scope[attrs.ngModel]); // capitalize initial value
          }
          
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
    
    
  }])

/*
 * Factories 
 */
/*
 * Client Details
 */
.factory('clientDetailService', ['$http', '$rootScope', function($http, $rootScope) {
  
  var clientDetails = {};
  var users = [];
  var collateral = [];
  
  function loadDetails(id, callback) {
    var args = {action:'clientDetail', q:id};
    
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
        angular.copy(result.data, clientDetails);
        if (callback) {
          callback(clientDetails);
        }
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  function deactivateClient(id, callback) {
    var args = {action:'deactivateClient', guid:id};
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
        if (callback) callback();
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  function reactivateClient(id, callback) {
    var args = {action:'reactivateClient', guid:id};
    $http.jsonp($rootScope.wsURL,
    {
      params:args,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      if (callback) callback();
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  function loadClientUsers(start) {
    
  }
  
  function loadCollateral(start) {
    
  }
  
  return {
    loadDetails:loadDetails,
    loadClientUsers:loadClientUsers,
    loadCollateral:loadCollateral,
    deactivate:deactivateClient,
    reactivate:reactivateClient,
    clientDetails:clientDetails,
    users:users,
    collateral:collateral
  };
    
}])
.factory('clientUserService', ['$http', '$rootScope', function($http, $rootScope) {
  
  var clientDetails = {};
  var users = [];
  var collateral = [];
  
  function loadDetails(id, callback) {
    var args = {action:'clientDetail', q:id};
    
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
        angular.copy(result.data, clientDetails);
        if (callback) {
          callback(clientDetails);
        }
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  function loadClientUsers(start) {
    
  }
  
  function loadCollateral(start) {
    
  }
  
  return {
    loadDetails:loadDetails,
    loadClientUsers:loadClientUsers,
    loadCollateral:loadCollateral,
    clientDetails:clientDetails,
    users:users,
    collateral:collateral
  };
    
}])

/*
 * Filters
 */
.filter('tel', function() {
  return function(tel) {
    if (!tel) { return ''; }
    
    var value = tel.toString().trim();
    var areaCode = value.substr(0, 3);
    var part1 = value.substr(2, 3);
    var part2 = value.substr(6);
    
    return '(' + areaCode + ') ' + part1 + '-' + part2;
    
  };
});

 
