'use strict';
var $ = $;

angular.module('wplAdmin')
.controller('AdminListCtrl', ['$scope', '$http', '$location', '$rootScope', 'adminUserService', function ($scope, $http, $location, $rootScope, adminUserService) {
    $scope.users = [];
    $scope.adminUserService = adminUserService;
    $scope.adminUserService.list = adminUserService.list;
    
    var listActive = true;
    var LIST_MODE__LIST = 'list';
    var LIST_MODE__SEARCH = 'search';
    
    var listMode = LIST_MODE__LIST;

    var searchString;
    var startPage;
    
    function construct() {
      loadPage(0);
    }
    
    /*
     * Load Client Page
     */
    
    function loadPage(_startPage) {
      startPage = _startPage;
      $scope.adminUserService.loadList(startPage, listActive, function(count) {
        //$scope.$broadcast('resultsLoaded', count);
      });
    }

    
    $scope.onAddUser = function() {
      $location.path('/addAdminUser');
    };   
    
    $scope.showUser = function(guid) {
      $location.path('/editAdminUser').search({id:guid});
    };
    
    
    $scope.listActive = function(value) {
      listActive = value;
      loadPage(0);
    };
    
    $scope.getActiveClass = function(value) {
      if (listActive === value) {
        return 'active';
      }
    };    
    
    construct();
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

