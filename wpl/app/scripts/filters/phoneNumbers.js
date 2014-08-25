'use strict';

angular.module('wplAdmin')
.filter('tel', function() {
  return function(tel) {
    if (!tel) { return ''; }
    
    var value = tel.toString().trim();
    var areaCode = value.substr(0, 3);
    var part1 = value.substr(2, 3);
    var part2 = value.substr(6);
    
    return '(' + areaCode + ') ' + part1 + '-' + part2;
    
  };
});

