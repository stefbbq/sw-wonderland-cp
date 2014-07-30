'use strict';

angular.module('wplAdmin')
.factory('collateralService', ['$http', '$rootScope', '$upload', function($http, $rootScope, $upload) {
  var pageSize = $rootScope.clientList.pageSize;
  var list = [];
  var details = {};
  var types = [];
  
  function loadList(clientID, startPage, active, callback) {
    var args = {action:'collateralList', clientID:clientID, s:startPage, c:pageSize, a:active ? '1':'0'};

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
  
  function search(clientID, startPage, searchString, active, callback) {
    var args = {action:'collateralSearch', clientID:clientID, s:startPage, c:pageSize, q:searchString, a:active ? '1':'0'};

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

  function save(collateral, action, onSuccess) {
    console.log(collateral);
    var params = {
      id:collateral.guid,
      client_id:collateral.client_id,
      name:collateral.name,
      type:collateral.type,
      description:collateral.description
    };
    // create collateral entry
    params.action = action;
    $http.jsonp($rootScope.wsURL, 
    {
      params : params,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {
      console.log(data);
      onSuccess(); // TODO: defer until assets uploaded.
    })          
    .error (function(data) {
      console.log('error', data);
    });
    
    
    

    // upload thumbnail


    // upload document    

    return;
    
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
    var args = {action:'collateralDetail', id:id};
    
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
  
  function deactivate(id, callback) {
    var args = {action:'deactivateCollateral', guid:id};
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
  
  function reactivate(id, callback) {
    var args = {action:'reactivateCollateral', guid:id};
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
  
  function loadCollateralTypes(callback) {
    var items = [];
    
    
    items.push({id:'booklet', name:'Booklet'});
    items.push({id:'leaflet', name:'Leaflet'});
    items.push({id:'directMail', name:'Direct Mail'});
    items.push({id:'poster', name:'Poster'});
    items.push({id:'stationary', name:'Stationary'});
    items.push({id:'businessCards', name:'Business Cards'});
    items.push({id:'folder', name:'Folder'});
    items.push({id:'packaging', name:'Packaging'});
    items.push({id:'customBox', name:'Custom Box'});
    items.push({id:'binder', name:'Binder'});
    items.push({id:'hrRecruitment', name:'HR Recruitment'});
    items.push({id:'largeFormat', name:'Large Format'});
    items.push({id:'special_other', name:'Special / Other'});
    
    angular.copy(items, types);
    
    if (callback) callback(items);
    return items;
  }
  
  function getCollateralTypeLabel(key) {
    var items = loadCollateralTypes();
    var value = '';
    for (var i=0; i<items.length; i++) {
      if (items[i].id === key) {
        value = items[i].name;
        break;
      }
    }
    
    return value;
  }
  
  
  return {
    loadList:loadList,
    list:list,
    types:types,
    getCollateralTypeLabel:getCollateralTypeLabel,
    loadTypeList:loadCollateralTypes,
    search:search,
    save:save,
    loadDetails:loadDetails,
    deactivate:deactivate,
    reactivate:reactivate,
    details:details
  };
    
}]);

