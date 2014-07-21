'use strict';

/**
 * @ngdoc function
 * @name wplAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wplAdminApp
 */
angular.module('wplAdmin')
  
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
    
  }])
  
.controller('Pager', function($scope, $http, $rootScope) {

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
  // No point in using this; the header row has to be defined in the markup anyway.
  // We would need to add the header row to a directive as well, and it might just
  // lead to confusion.
  .directive('sdgClientRecord', function($timeout) {
      return {
        restrict:'A',
        templateUrl: 'views/templates/client_record.html',
        link: function(scope, element, attr) {
          console.log('record');
        }
      };
});    
*/


/*
 * Factories
 */
angular.module('wplAdmin')
    .factory('clientListService', function($http, $rootScope) {
      var list = [];
      var pageSize = $rootScope.clientList.pageSize;
      
      function loadList(startPage) {
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

      
  });
