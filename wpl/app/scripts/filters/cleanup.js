'use strict';

angular.module('wplAdmin')
.filter('cleanup', function() {
  return function(txt) {
    if (!txt) { return ''; }
    return txt.replace('\\', '');
  };
});

