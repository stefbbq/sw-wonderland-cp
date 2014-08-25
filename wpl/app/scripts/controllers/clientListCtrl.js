'use strict';
var $ = $;

angular.module('wplAdmin')
.controller('SearchCtrl', ['$scope', function($scope) {
    $scope.doSearch = function() {
      $scope.$emit('searchClients', 0, $scope.searchString);
    };
}])
.controller('ClientListCtrl', ['$scope', '$http', '$location', '$rootScope', 'clientService', function ($scope, $http, $location, $rootScope, clientService) {
    $scope.companies = [];
    $scope.clientService = clientService;
    $scope.clientService.list = clientService.list;
    
    var listActive = true;
    var LIST_MODE__LIST = 'list';
    var LIST_MODE__SEARCH = 'search';
    
    var listMode = LIST_MODE__LIST;

    var searchString;
    var startPage;
    
    /*
     * Load Client Page
     */
    
    $scope.$on('loadClientPage', function(e, startPage) {
      loadClientPage(startPage);
    });
    
    $scope.$on('searchClients', function(e, startPage, _searchString) {
      searchString = _searchString;
      
      if (searchString === undefined || searchString.length === 0) {
        loadClientPage(startPage);
      } else {
        searchClients(startPage, searchString);
      }
    });
    
    function loadClientPage(_startPage) {
      startPage = _startPage;
      $scope.clientService.loadList(startPage, listActive, function(count) {
        $scope.$broadcast('clientResultsLoaded', count);
      });
    }
    
    function searchClients(_startPage, _searchString) {
      startPage = _startPage;
      searchString = _searchString;
      $scope.clientService.search(startPage, searchString, listActive, function(count) {
        $scope.$broadcast('clientResultsLoaded', count);
      });
    }
    
    
    $scope.onAddClient = function() {
      $location.path('/addClient');
    };   
    
    $scope.showClient = function(guid) {
      $location.path('/clientDetail').search({id:guid});
    };
    
    
    $scope.listActive = function(value) {
      listActive = value;
      if (listMode === LIST_MODE__SEARCH) {
        searchClients(0, searchString);
      } else {
        loadClientPage(0);
      }
    };
    
    $scope.getActiveClass = function(value) {
      if (listActive === value) {
        return 'active';
      }
    };    
    
    
    loadClientPage(0);
    
  }])
  
  /*
   * Pager
   * This is the view which displays the pagination.
   * It listens for the 'clientResultsLoaded' event 
   * and draws based on the number of records available.
   */
.controller('ClientListPager', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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

    
  }]);

