"use strict";
angular.module('ChangePasswordApp', [])
.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
})
.directive('match', [function() {
	return {
		require:"ngModel",
		restrict:'A',
		scope: {
			match: '='
		},
		link:function(scope, element, attrs, ctrl) {
			scope.$watch(function() {
				return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue;
			
			}, function(currentValue) {
				ctrl.$setValidity('match', currentValue);
			})
			
		}
	}
	
}])
.factory('ResetWSFactory', ['$http', '$location', function($http, $location) {

  var result = {message:'nothing to report'};
	var wsURL;
	
  switch ($location.$$host) {
		case  'localhost':
			wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
			break;
		case  'bach':
			wsURL = 'http://bach/wonderland-cp/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
			break;
		case 'wonderland-cp.stagebot.net':
			wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
			break;
	}
  
  function resetPassword(id, originalPassword, newPassword) {
		var args = {};
		args.action = 'changeAdminPassword';
		args.guid = id;
		args.p0 = md5(originalPassword);
		args.p1 = md5(newPassword);
		
		console.log('args', args);
		
		$http.jsonp(wsURL, {
			params:args,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		
		}).success(function(wsResult) {
			angular.copy(wsResult, result);
		}).error(function(err) {
			console.log('error', err);
		});
		
		
	}
	
	
	return {
		resetPassword:resetPassword,
		result:result
	};
	
  
}])
.controller('PasswordFormCtrl', ['$scope', '$http', '$location', 'ResetWSFactory', function($scope, $http, $location, ResetWSFactory) {
	var user = $scope.user = {};
	
	user.guid = $location.search()['id'];
  
  var ws = $scope.webService = ResetWSFactory;

	$scope.save = function() {
		ws.resetPassword(user.guid, user.oldPassword, user.password);
	};
	


}]);