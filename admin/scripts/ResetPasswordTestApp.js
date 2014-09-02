"use strict";
angular.module('ChangePasswordTest', [])
.controller('ResetFormCtrl', ['$scope', '$http', '$location', 'ResetWSFactory', function($scope, $http, $location, ResetWSFactory) {
	$scope.resetWS = ResetWSFactory;
	
	var user = {};
	$scope.user = user;
	


	$scope.reset = function() {
		console.log('reset', user);
		$scope.resetWS.sendResetRequest(user.id, user.username, user.email);
	};
	
	$scope.autofill = function() {
		user.username = 'testUser';
		user.email = 'sdgarson@gmail.com';
	};


}])
.factory('ResetWSFactory', ['$http', '$location', function($http, $location) {
	var result = {message:'nothing to report'};
	var wsURL;

	switch ($location.$$host) {
		case  'localhost':
			wsURL = 'http://localhost:81/wonderlandws/WPLAdmin.php?callback=JSON_CALLBACK';
			break;
		case 'wonderland-cp.stagebot.net':
			wsURL = 'http://wonderland-cp.stagebot.net/webservice/WPLAdmin.php?callback=JSON_CALLBACK';
			break;
	}
	
	
	

	function sendResetRequest(id, username, email) {
		var args = {};
		args.action = id === undefined ? 'addAdminUser':'updateAdminUser';
		if (id !== undefined) args.id = id;
		args.username = username;
		args.email = email;
		//args.test = true;
		
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
		sendResetRequest:sendResetRequest,
		result:result
	};
	

}])
;