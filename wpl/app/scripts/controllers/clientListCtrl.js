'use strict';
var $ = $;

angular.module('wplAdmin')
.controller('SearchCtrl', ['$scope', function($scope) {
    
    $scope.doSearch = function() {
      if ($scope.searchString.length === 0) {
        // nothing entered; show all
        $scope.$emit('loadClientPage', 0);
      } else {
        $scope.$emit('searchClients', 0, $scope.searchString);
      }
    };
}])
.controller('ClientListCtrl', ['$scope', '$http', '$location', '$rootScope', 'clientListService', function ($scope, $http, $location, $rootScope, clientListService) {
    $scope.companies = [];
    $scope.clientListService = clientListService;
    $scope.clientListService.list = clientListService.list;
    /*
     * Load Client Page
     */
    
    $scope.$on('loadClientPage', function(e, startPage) {
      loadClientPage(startPage);
    });
    
    $scope.$on('searchClients', function(e, startPage, searchString) {
      searchClients(startPage, searchString);
    });
    
    function loadClientPage(startPage) {
      $scope.clientListService.loadList(startPage, function(count) {
        $scope.$broadcast('clientResultsLoaded', count);
      });
    }
    
    function searchClients(startPage, searchString) {
      $scope.clientListService.search(startPage, searchString, function(count) {
        $scope.$broadcast('clientResultsLoaded', count);
      });
    }
    
    
    $scope.onAddClient = function() {
      $location.path('/addClient');
    };   
    
    $scope.showClient = function(guid) {
      $location.path('/clientDetail').search({id:guid});
    };
    
    loadClientPage(0);
    
  }])
  
  /*
   * Pager
   * This is the view which displays the pagination.
   * It listens for the 'clientResultsLoaded' event 
   * and draws based on the number of records available.
   */
.controller('Pager', function($scope, $http, $rootScope) {
    var pageList = [];
    var pageIndex = 0;
    $scope.pages = [];
    
    $scope.$on('clientResultsLoaded', function(e, recordCount) {
      var pageSize = $rootScope.clientList.pageSize;
      var pageCount = Math.ceil(recordCount / pageSize);
      var recordNum = 0;
      pageList.length = 0;
      for (var i=0; i<pageCount; i++) {
        pageList.push({num:i + 1, recordNum:recordNum});
        recordNum += pageSize;
      }
      
      angular.copy(pageList, $scope.pages);
    });
    
  
    $scope.prevPage = function() {
      if (pageIndex > 0) {
        $scope.loadPage(pageIndex - 1);
      }
    };

    $scope.nextPage = function() {
      if (pageIndex < pageList.length - 1) {
        $scope.loadPage(pageIndex + 1);
      }
    };
  
    $scope.loadPage = function(index) {
      pageIndex = index;
      var data = pageList[index];
      $scope.$emit('loadClientPage', data.recordNum);
      hilightCurrentPage();

    };
    
    $scope.$on('pagerComplete', function() {
      hilightCurrentPage();
    });
    
    function hilightCurrentPage() {
      $('.page-numbers a').removeClass('selected');
      var $item = $($('.page-numbers a')[pageIndex]);
      $item.addClass('selected');
    }
  });

/*
 * Directives
 */
angular.module('wplAdmin')
  .directive('pagerComplete', function($timeout) {
      return {
        link: function(scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function() {
              scope.$emit('pagerComplete');
            });
          }
        }
      };
});

/*
 * Factories
 */
angular.module('wplAdmin')
    .factory('clientListService', function($http, $rootScope) {
      var list = [];
      var pageSize = $rootScope.clientList.pageSize;
      
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

      function searchList(startPage, searchString, callback) {
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

      return {
        list:list,
        loadList:loadList,
        search:searchList
      };

      
  });
