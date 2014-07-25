angular.module('wplAdmin')
.factory('clientUserService', ['$http', '$rootScope', function($http, $rootScope) {
  
  var userDetails = {};
  var list = [];
  /*
   * Load List
   */
  function loadList(id, callback) {
    var args = {action:'clientUserList', id:id};
    $http.jsonp($rootScope.wsURL, {
      params:args,
      header: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
      angular.copy(result.data.list, list);
      if (callback) callback();
    }).error(function(err) {
      console.log('error', err);
    });
  }
  
  /*
   * Save User
   */
  function saveUser(user, action, onSuccess) {
    var params = angular.copy($scope.user);
    params.action = action;
    params.company_id = companyID;

    $http.jsonp($rootScope.wsURL, 
    {
      params : params,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {
      var msg;
      if (addMode) {
        msg = 'user added';
      } else {
        msg = 'user updated';
      }
      alert(msg);
      $location.path('clientDetail').search({id:companyID});
    })          
    .error (function(data) {
      console.log('error', data);
    });  
  }

  function loadDetails(id, callback) {
    var args = {action:'clientDetail', q:id};
    
    $http.jsonp($rootScope.wsURL, 
    {
      params:args,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function(result) {
        angular.copy(result.data, clientDetails);
        if (callback) {
          callback(clientDetails);
        }
    }).error(function(err) {
      console.log('error', err);
    });
  }
  

  return {
    loadDetails:loadDetails,
    loadList:loadList,
    save:saveUser,
    list:list
  };
    
}]);

 

