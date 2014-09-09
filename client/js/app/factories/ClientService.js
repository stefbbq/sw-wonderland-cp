angular.module('ClientPortalApp')
.factory('ClientService', ['$http', '$rootScope', function($http, $rootScope) {
  var me = {};
  me.company = {};

  me.loadDetail = function(id, callback) {
    var args = {action:'clientDetail', q:id};
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      result.data.country = 'Canada';
      angular.copy(result.data, me.company);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  }

  
  return me;
}])

;
