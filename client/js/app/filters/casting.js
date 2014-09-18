'use strict';

angular.module('ClientPortalApp')
.filter('numeric', function() {
  return function(val) {
    return Number(val);
  };
});

