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
  
  function search(clientID, searchString, startPage, active, callback) {
    var args = {action:'collateralSearch', clientID:clientID, s:startPage, c:pageSize, q:searchString, a:active ? '1':'0'};

    $http.jsonp($rootScope.wsURL, 
    {
        params:args,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(result) {
      angular.copy(result.data.list, list);
      console.log(list);
      var count = result.data.count;
      callback(count);
    })          
    .error (function(result) {
        console.log('error', result);
    });         
  }

  function loadListFull(startPage, active, callback) {
    var args = {action:'collateralListFull', s:startPage, c:$rootScope.collateralList_full.pageSize, a:active ? '1':'0'};

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
  
  function searchAll(searchString, startPage, active, callback) {
    var args = {action:'collateralSearchFull', s:startPage, c:pageSize, q:searchString, a:active ? '1':'0'};

    $http.jsonp($rootScope.wsURL, 
    {
        params:args,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(result) {
      angular.copy(result.data.list, list);
      console.log(list);
      var count = result.data.count;
      callback(count);
    })          
    .error (function(result) {
        console.log('error', result);
    });         
  }  
  
  function save(collateral, action, onProgress, onSuccess) {
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
    .success(function(result) {
      var collateralID = result.data.id;
      uploadFile('thumb', collateralID, collateral.thumbFile, onProgress, function() {
        uploadFile('file', collateralID, collateral.file, onProgress, function() {
          onSuccess();
        });
      });
      
      //onSuccess(); // TODO: defer until assets uploaded.
    })          
    .error (function(data) {
      console.log('error', data);
    });
  
  }
  
  function uploadFile(type, collateralID, file, onProgress, onComplete) {
    console.log("collateralID", collateralID);
    if (file == null) {
      onComplete();
      return;
    }
    console.log('uploadingFile');
    
    var url = $rootScope.wsUploadURL + '?action=upload' + (type == "thumb" ? 'Thumb' : 'File') ;
    $upload.upload({
      url:url,
      method:'POST',
      data:{id:collateralID},
      file:file
    }).progress(function(e) {
      if (onProgress) onProgress(e);
    }).success(function(data, status, headers, config) {
      //$('#server_response').html($('#server_response').html() + data);
        onComplete();
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
  
  /*
   * Save to Dropbox
   */
  function saveToDropbox(collateral, file, onProgress, onComplete) {
    var url = $rootScope.wsDropboxURL + '?action=saveToDropbox';
    $upload.upload({
      url:url,
      method:'POST',
      data:{name:collateral.name},
      file:file
    }).progress(function(e) {
      if (onProgress) onProgress(e);
    }).success(function(data, status, headers, config) {
      $('#server_response').html(data);
        onComplete();
    });
    
  }
  
  
  return {
    loadList:loadList,
    loadListFull:loadListFull,
    list:list,
    types:types,
    getCollateralTypeLabel:getCollateralTypeLabel,
    loadTypeList:loadCollateralTypes,
    search:search,
    searchAll:searchAll,
    save:save,
    loadDetails:loadDetails,
    deactivate:deactivate,
    reactivate:reactivate,
    details:details,
    saveToDropbox:saveToDropbox
  };
    
}]);

