/*
 * Dispatches an event when the pager widget has finished rendering.
 * This is used so that we can apply stying through jquery.
 */
angular.module('wplAdmin')
  .directive('pagerComplete', function($timeout) {
      return {
        link: function(scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function() {
              scope.$emit('pagerComplete');
            });
          }
        }
      };
});
