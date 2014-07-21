'use strict';

/**
 * @ngdoc function
 * @name wplAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wplAdminApp
 */
angular.module('wplAdmin')
  .factory('clientListService', function($http, $rootScope) {
      var list = [];

      function loadList(startPage) {
        var pageSize = $rootScope.clientList.pageSize;      
        var args = {action:'clientList', s:startPage, c:pageSize};
        
        $http.jsonp($rootScope.wsURL, 
        {
            params:args,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(result) {
          angular.copy(result.data, list);
          //console.log('success', list);
        })          
        .error (function(result) {
            console.log('error', result);
        });        
      }



      return {
        list:list,
        loadList:loadList
      };

      
  })
  .controller('ClientListCtrl', ['$scope', '$http', '$location', '$rootScope', 'clientListService', function ($scope, $http, $location, $rootScope, clientListService) {
    $scope.companies = [];
    $scope.clientListService = clientListService;
    $scope.clientListService.list = clientListService.list;
    /*
     * Load Client Page
     */
    
    $scope.$on('loadClientPage', function(e, startPage) {
      loadClientPage(startPage)
    });
    
    function loadClientPage(startPage) {
      $scope.clientListService.loadList(startPage);
    }
    
    $scope.onAddClient = function() {
      $location.path('/addClient');
    };   
    
    loadClientPage(0);
    
  }]).controller('Pager', function($scope, $http, $rootScope) {

    var args = {action:'clientCount'};
    var pageList = [];
    var pageIndex = 0;

    $http.jsonp($rootScope.wsURL, 
    {
        params:args,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(result) {
      var recordCount = result.data.total;
      var pageSize = $rootScope.clientList.pageSize;
      var pageCount = Math.ceil(recordCount / pageSize);
      var recordNum = 0;
      for (var i=0; i<pageCount; i++) {
        pageList.push({num:i + 1, recordNum:recordNum})
        recordNum += pageSize;
      }
      
      $scope.pages = pageList;
    })          
    .error (function(result) {
        console.log('error', result);
    });
    
    $scope.prevPage = function() {
      alert('prevPage');
    };

    $scope.nextPage = function() {
      alert('prevPage');
    };
  
    $scope.loadPage = function(index) {
      var data = pageList[index];
      $scope.$emit('loadClientPage', data.recordNum);
    };
    
    
  });

/*
angular.module('wplAdmin')
  .factory('clientListService', function($http, $rootScope) {
      var list = [];

      function loadList(startPage) {
        var pageSize = $rootScope.clientList.pageSize;      
        var args = {action:'clientList', s:startPage, c:pageSize};
        
        $http.jsonp($rootScope.wsURL, 
        {
            params:args,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(result) {
          list = result.data;
          console.log('success', list);
        })          
        .error (function(result) {
            console.log('error', result);
        });        
      }



      return {
        list:list,
        loadList:loadList
      };

      
  });
*/