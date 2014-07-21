'use strict';

/**
 * @ngdoc function
 * @name wplAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wplAdminApp
 */
angular.module('wplAdminApp')
  .controller('ClientListCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
