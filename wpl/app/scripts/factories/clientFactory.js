'use strict';

angular.module('wplAdmin')
.factory('clientService', ['$http', '$rootScope', function($http, $rootScope) {
  var pageSize = $rootScope.clientList.pageSize;
  var list = [];
  var details = {};
  var users = [];
  
  function loadList(startPage, callback) {
    var args = {action:'clientList', s:startPage, c:pageSize};

    $http.jsonp($rootScope.wsURL, 
    {
        params:args,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(result) {
      angular.copy(result.data.list, list);
      var count = result.data.count;
      callback(count);
    })          
    .error (function(result) {
        console.log('error', result);
    });        
  }

  function search(startPage, searchString, callback) {
    var args = {action:'clientSearch', s:startPage, c:pageSize, q:searchString};

    $http.jsonp($rootScope.wsURL, 
    {
        params:args,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(result) {
      angular.copy(result.data.list, list);
      var count = result.data.count;
      callback(count);
    })          
    .error (function(result) {
        console.log('error', result);
    });         
  }

  function save(client, action, onSuccess) {
    var params = client;
    params.action = action;

    $http.jsonp($rootScope.wsURL, 
    {
      params : params,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {
      onSuccess();
      
    })          
    .error (function(data) {
      console.log('error', data);
    });
    
  }
  
  
  function loadDetails(id, callback) {
    var args = {action:'clientDetail', q:id};
    
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
        angular.copy(result.data, details);
        if (callback) {
          callback(details);
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
  
 
  
  function loadCollateral(start) {
    
  }
  
  return {
    loadList:loadList,
    list:list,
    search:search,
    save:save,
    loadDetails:loadDetails,
    loadCollateral:loadCollateral,
    deactivate:deactivateClient,
    reactivate:reactivateClient,
    details:details
  };
    
}]);

