angular.module('ClientPortalApp')
.factory('ClientService', ['$http', '$rootScope', '$upload', '$sce', function($http, $rootScope, $upload, $sce) {
  var me = {};

  /**
   * Client Detail
   */
  me.company = {};
  me.loadDetail = function(callback) {
  // console.log('$rootScope.clientID', $rootScope.clientID);
    var args = {action:'clientDetail', q:$rootScope.clientID};
    
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

  /**
   * Order History
   */
  me.orderHistory = [];
  me.loadOrderHistory = function(callback) {
    var args = {action:'getOrderHistory', clientID:$rootScope.clientID};
    console.log(args);
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      // console.log(result);
      for (var i=0; i<result.data.length; i++) {
        var item = result.data[i];
        item.quantity = Number(item.quantity);
        item.name = item.name.replace('\\', '');
        // console.log(result);
        // item.order_date = (new Date(item.order_date)).getTime();
        // console.log(item.order_date);
      }
    
    
      angular.copy(result.data, me.orderHistory);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  }  

  /**
   * Search Order History
   */
  me.searchOrderHistory = function(searchTerm, callback) {
    var args = {action:'searchOrderHistory', clientID:$rootScope.clientID, q:searchTerm};
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      for (var i=0; i<result.data.length; i++) {
        var item = result.data[i];
        item.quantity = Number(item.quantity);
        item.name = item.name.replace('\\', '');
      }
    
    
      angular.copy(result.data, me.orderHistory);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  /**
   * Collateral List
   */
  me.collateralList = [];
  me.loadCollateralList = function(callback) {
    var args = {action:'clientCollateralList', clientID:$rootScope.clientID};
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
    
      angular.copy(result.data.list, me.collateralList);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  }
  

  /**
   * Collateral Search
   */
  me.searchCollateral = function(searchTerm, callback) {
    var args = {action:'clientCollateralSearch', clientID:$rootScope.clientID, q:searchTerm};
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
    
      angular.copy(result.data.list, me.collateralList);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  
  /**
   * Collateral Types
   */
  me.typeList = [];
  me.loadTypeList = function(callback) {
    var args = {action:'typeList'};
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
    
      angular.copy(result.data, me.typeList);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  
  };
  
  
  /**
   * Collateral Item
   */
  me.collateral = {};
  me.loadCollateralDetails = function(id, callback) {
    var args = {action:'collateralDetail', id:id};
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      
      angular.copy(result.data, me.collateral);
      if (callback) callback(result.data);
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  /**
   * Submit Order
   */
  me.orderResult = {};
  me.submitOrder = function(clientID, userID, collateralID, quantity, comment, callback) {
    var args = {action:'submitReorder', client:clientID, user:userID, collateral:collateralID, quantity:quantity, comment:comment};
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      
      angular.copy(result, me.orderResult);
      if (callback) callback(result);
    }).error(function(err) {
      console.log('error', err);
    });
  
  }
  

  /**
   * RFQ Dropdown Content
   */
  me.dropdown = {};
  me.getDropdownContent = function(callback) {
    var args = {action:'getRFQDropdownContent'};
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      console.log(result.data);
      angular.copy(result.data, me.dropdown);
      if (callback) callback(result);
    }).error(function(err) {
      console.log('error', err);
    });
  
  }
  
  /**
   * Submit RFQ
   * Save to Dropbox
   */
  me.submitQuoteRequest = function (quoteData, file, onProgress, onComplete) {
  
    var url = $rootScope.wsDropboxURL + '?action=requestQuote';
    $('#server_response').html('');

    $upload.upload({
      url:url,
      method:'POST',
      data:quoteData,
      file:file
    }).progress(function(e) {
      if (onProgress) onProgress(e);
    }).success(function(data, status, headers, config) {
      //$('#server_response').html(data);
      onComplete();
    });
    
  }


  /**
   * Get Latest News
   */
  me.latestNews = {};
  me.getLatestNews = function() {
    var url = $rootScope.eeAPI;
    url = url.replace('{call}', 'news');
    console.log(url);
    
    var args = {};
    $http({
      method: "JSONP",
      url: url,
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      angular.copy(result, me.latestNews);
      console.log(result);
    })
    .error(function(err) {
      console.log('error', err);
    });
    
    
  };
  
  
  
  return me;
}])

;
