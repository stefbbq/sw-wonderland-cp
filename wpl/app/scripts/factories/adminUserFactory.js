'use strict';

angular.module('wplAdmin')
.factory('adminUserService', ['$http', '$rootScope', function($http, $rootScope) {
  var userDetails = {};
  var clientDetails = {};
  var list = [];
  /*
   * Load List
   */
  function loadList(id, active, callback) {
    var args = {action:'adminUserList', id:id, a:active ? 1:0};
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers: $rootScope.jsonHeader
    }).success(function(result) {
      angular.copy(result.data.list, list);
      if (callback) callback();
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  /*
   * Save User
   */
  function saveUser(user, action, onSuccess) {
    var params = user;
    params.action = action;

    $http.jsonp($rootScope.wsURL, 
    {
      params : params,
      headers: $rootScope.jsonHeader
    })
    .success(function(data) {
      if (onSuccess) onSuccess();
    })          
    .error (function(data) {
      console.log('error', data);
    });  
  }
  
  function changePassword (payload, onSuccess) {
    var params = payload;
    params.action = 'changeAdminPassword';

    $http.jsonp($rootScope.wsURL, 
    {
      params : params,
      headers: $rootScope.jsonHeader
    })
    .success(function(data) {
      if (onSuccess) onSuccess(data);
    })          
    .error (function(data) {
      console.log('error', data);
    });  
  };

  function loadDetails(id, callback) {
    var args = {action:'adminUserDetail', id:id};
    
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers: $rootScope.jsonHeader
    }).success(function(result) {
        console.log(result);
        angular.copy(result.data, userDetails);
        if (callback) {
          callback(userDetails);
        }
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  /*
   * Deactivate / Reactivate User
   */
  function deactivateUser(id, callback) {
    var args = {action:'deactivateClientUser', guid:id};
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers: $rootScope.jsonHeader
    }).success(function(result) {
      if (callback) callback();
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  function reactivateUser(id, callback) {
    var args = {action:'reactivateClientUser', guid:id};
    $http.jsonp($rootScope.wsURL,
    {
      params:args,
      headers: $rootScope.jsonHeader
    }).success(function(result) {
      if (callback) callback();
    }).error(function(err) {
      console.log('error', err);
    });
  }  

  return {
    loadList:loadList,
    list:list,
    loadDetails:loadDetails,
    user:userDetails,
    changePassword:changePassword,
    client:clientDetails,
    save:saveUser,
    deactivate:deactivateUser,
    reactivate:reactivateUser
  };
    
}]);

 

