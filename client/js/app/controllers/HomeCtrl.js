angular.module('ClientPortalApp')
.controller('HomeCtrl', ['$scope', '$cookieStore', 'ClientService', function($scope, $cookieStore, ClientService) {
  $scope.ws = ClientService;
  
  var clientData = $cookieStore.get('clientData');
  
  
  if (!clientData) {
    clientData = {client_id:'c41181be-c14f-4ef7-a54e-9255e8c9783d'};
  }
  
  var companyID = clientData.client_id;
  
  $scope.ws.loadDetail(companyID);
  
  
  
  
  
}])

;