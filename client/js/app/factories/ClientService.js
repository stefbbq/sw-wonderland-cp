angular.module('ClientPortalApp')
.factory('ClientService', ['$http', '$rootScope', function($http, $rootScope) {
  var me = {};

  /**
   * Client Detail
   */
  me.company = {};
  me.loadDetail = function(callback) {
  console.log('$rootScope.clientID', $rootScope.clientID);
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
    
    $http.jsonp($rootScope.wsURL, {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      for (var i=0; i<result.data.length; i++) {
        var item = result.data[i];
        item.quantity = Number(item.quantity);
        item.name = item.name.replace('\\', '');
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
  

  
  return me;
}])

;
