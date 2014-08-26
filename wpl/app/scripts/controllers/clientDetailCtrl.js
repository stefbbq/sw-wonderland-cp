'use strict';
var $ = $;
/*
 * Controllers
 */
angular.module('wplAdmin')
/*
 * Client Detail
 */
.controller('ClientDetailCtrl', ['$scope', '$location', 'clientService', 'clientUserService', 'collateralService', function($scope, $location, clientService, clientUserService, collateralService) {
    $scope.clientService = clientService;
    $scope.clientUserService = clientUserService;
    $scope.collateralService = collateralService;
    
    var listActive = true;
    
    var LIST_MODE__LIST = 'list';
    var LIST_MODE__SEARCH = 'search';
    
    var listMode = LIST_MODE__LIST;

    var listCollateralActive = true;
    var searchString = null;
    var startPage;
    
    function construct() {
      setClientActiveStatus(true);
      loadClientDetails();
      loadClientUsers();
      loadCollateralPage(0);
    }
    
    var id = $location.search().id;
    var clientActive;
    
    // load detail
    function loadClientDetails() {
      $scope.clientDetails = clientService.clientDetails;
      clientService.loadDetails(id, function(data) {
        setClientActiveStatus(data.active === '1');
      });
    }
    
    // Load user list
    $scope.users = clientUserService.users;
    function loadClientUsers() {
      clientUserService.loadList(id, listActive, function() {

      });
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
      $scope.collateralService.loadList(id, startPage, listCollateralActive, function(count) {
        $scope.$broadcast('collateralResultsLoaded', count);
      });
    }  
    
    function loadCollateralSearchPage(_startPage, _searchString) {
      startPage = _startPage;
      searchString = _searchString;
      //console.log(id, startPage, searchString, listCollateralActive);
      $scope.collateralService.search(id, searchString, startPage, listCollateralActive, function(count) {
        $scope.$broadcast('collateralResultsLoaded', count);
      });
    }    
    
    $scope.showCollateral = function(collateralID) {
      $location.path('/collateralDetail').search({id:collateralID, clientID:id});
    };
    
    $scope.showClientUser = function(id) {
      $location.path('/clientUserDetail').search({id:id});
    };
    
    function setClientActiveStatus(value) {
      clientActive = value;
      $scope.activeStatusLabel = clientActive ? "Deactivate Client" : "Reactivate Client";
    }
    
    // edit button
    $scope.editClient = function() {
      $location.path('editClient').search({id:id});
    };
    
    // active status button
    $scope.changeActiveStatus = function() {
      if (clientActive) {
        if (confirm('Are you sure you want to deactivate this client?')) {
          clientService.deactivate(id, function() {
            setClientActiveStatus(false);
            alert('Client deactivated');
          });
        }
      } else {
        clientService.reactivate(id, function() {
          setClientActiveStatus(true);
          alert('Client reactivated');
        });
      }
    };
    
    // add user
    $scope.addUser = function() {
      $location.path('addClientUser').search({companyID:id});
    };

    
    $scope.listActive = function(value) {
      listActive = value;
      loadClientUsers();
    };    
    
    $scope.getActiveClass = function(value) {
      if (listActive === value) {
        return 'active';
      }
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
.controller('CollateralSearchCtrl', ['$scope', function($scope) {
    $scope.doSearch = function() {
      //console.log($scope.searchString, $scope.searchString.length, $scope.searchString.length === 0);
      $scope.$emit('searchCollateral', 0, $scope.searchString);
      /*
      
      console.log($scope.searchString, $scope.searchString === undefined);
      if ($scope.searchString === undefined || $scope.searchString.length === 0) {
        // nothing entered; show all
        console.log('empty search -- show all');
        $scope.$emit('loadCollateralPage', 0);
      } else {
        console.log('searching');
        console.log('length', $scope.searchString.length);
        $scope.$emit('searchCollateral', 0, $scope.searchString);
      }
      */
    };
}])

 /*
   * Pager
   * This is the view which displays the pagination.
   * It listens for the 'collateralResultsLoaded' event 
   * and draws based on the number of records available.
   */
.controller('CollateralPager', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
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
