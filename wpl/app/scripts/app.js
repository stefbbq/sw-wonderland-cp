'use strict';
var basePath = basePath || '';
var viewExt = viewExt || '.html';
/**
 * @ngdoc overview
 * @name wplAdminApp
 * @description
 * # wplAdminApp
 *
 * Main module of the application.
 */
angular
  .module('wplAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.mask'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listClients', {
        templateUrl: basePath + 'views/listClients' + viewExt,
        controller: 'ClientListCtrl'
      })
      .when('/addClient', {
        templateUrl: basePath + 'views/addClient' + viewExt,
        controller: 'AddClientCtrl'
      })
      .otherwise({
        redirectTo: '/listClients'
      });
  })
  .directive('capitalizeFirst', function() {
      return {
          require: 'ngModel',
          link:function(scope, element, attrs, modelCtrl) {
              var capitalize = function(inputValue) {
                  if (inputValue !== undefined) {
                    var capitalized = inputValue.charAt(0).toUpperCase() + inputValue.substr(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                } else {
                    return '';
                }
              };
              
              modelCtrl.$parsers.push(capitalize);
              capitalize(scope[attrs.ngModel]); // capitalize initial value
          }
          
      };
  })
  .directive('capitalize', function() {
      return {
          require: 'ngModel',
          link:function(scope, element, attrs, modelCtrl) {
              var capitalize = function(inputValue) {
                  if (inputValue !== undefined) {

                    var capitalized = inputValue.toUpperCase();
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                } else {
                    return '';
                }
              };
              
              modelCtrl.$parsers.push(capitalize);
              capitalize(scope[attrs.ngModel]); // capitalize initial value
          }
          
      };
  })
  .controller('MenuController', ['$scope', function($scope) {
    $scope.getClass = function(path) {
        var urlPath = window.location.hash.substr(1);
        
        if (urlPath === path) {
          return 'active';
        } else {
          return '';
        }
    };
  }])
  
;
