'use strict';

angular.module('wplAdmin')
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
});