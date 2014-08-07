'use strict';
var $ = $;
/*
 * Controllers
 */
angular.module('wplAdmin')
/*
 * Client Detail
 */
.controller('CollateralListCtrl', ['$scope', '$location', 'collateralService', function($scope, $location, collateralService) {
    $scope.collateralService = collateralService;
    
    var LIST_MODE__LIST = 'list';
    var LIST_MODE__SEARCH = 'search';
    
    var listMode = LIST_MODE__LIST;

    var listCollateralActive = true;
    var searchString = null;
    var startPage;
    
    function construct() {
      loadCollateralPage(0);
    }
    
    
    $scope.$on('loadCollateralPage', function(e, startPage) {
        loadCollateralPage(startPage);
    });    
    
    $scope.$on('searchCollateral', function(e, startPage, _searchString) {
      searchString = _searchString;
      
      if (searchString === undefined || searchString.length === 0) {
        loadCollateralPage(startPage);
      } else {
        loadCollateralSearchPage(startPage, _searchString);
      }
    });
    function loadCollateralPage(_startPage) {
      startPage = _startPage;
      $scope.collateralService.loadListFull(startPage, listCollateralActive, function(count) {
        $scope.$broadcast('collateralResultsLoaded', count);
      });
    }  
    
    function loadCollateralSearchPage(_startPage, _searchString) {
      startPage = _startPage;
      searchString = _searchString;
      $scope.collateralService.searchAll(searchString, startPage, listCollateralActive, function(count) {
        $scope.$broadcast('collateralResultsLoaded', count);
      });
    }    
    
    $scope.showCollateral = function(collateralID, clientID) {
      $location.path('/collateralDetail').search({id:collateralID, clientID:clientID});
    };
    
    $scope.listActiveCollateral = function(value) {
      listCollateralActive = value;
      loadCollateralPage(0);
    };  
    
    $scope.getActiveCollateralClass = function(value) {
      if (listCollateralActive === value) {
        return 'active';
      }
    };
    
    construct();
}])
.controller('CollateralSearchAllCtrl', ['$scope', function($scope) {
    $scope.doSearch = function() {
      //console.log($scope.searchString, $scope.searchString.length, $scope.searchString.length === 0);
      $scope.$emit('searchCollateral', 0, $scope.searchString);
    };
}])

 /*
   * Pager
   * This is the view which displays the pagination.
   * It listens for the 'collateralResultsLoaded' event 
   * and draws based on the number of records available.
   */
.controller('CollateralAllPager', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    var pageList = [];
    var pageIndex = 0;
    $scope.collateralPages = [];
    
    $scope.$on('collateralResultsLoaded', function(e, recordCount) {
      var pageSize = $rootScope.collateralList.pageSize;
      var pageCount = Math.ceil(recordCount / pageSize);
      var recordNum = 0;
      pageList.length = 0;
      for (var i=0; i<pageCount; i++) {
        pageList.push({num:i + 1, recordNum:recordNum});
        recordNum += pageSize;
      }
      
      angular.copy(pageList, $scope.collateralPages);
    });
    
  
    $scope.prevCollateralPage = function() {
      if (pageIndex > 0) {
        $scope.loadPage(pageIndex - 1);
      }
    };

    $scope.nextCollateralPage = function() {
      if (pageIndex < pageList.length - 1) {
        $scope.loadPage(pageIndex + 1);
      }
    };
  
    $scope.loadCollateralPage = function(index) {
      pageIndex = index;
      var data = pageList[index];
      $scope.$emit('loadCollateralPage', data.recordNum);
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
