angular.module('webapp').filter('isMobile', isMobile);
isMobile.$inject = ['$mdMedia']

function isMobile ($mdMedia) {
  return function(then, otherwise) {
    return $mdMedia('gt-sm') ? then : otherwise
  }
}
