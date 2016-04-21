/**
 * @ngdoc directive
 * @name webapp.directive:wa-breadcrump
 * @restrict E
 * @description Breadcrump component.
 */
angular.module('webapp').component('waBreadcrump', {
    controller: 'BreadcrumpCtrl',
    bindings: {
      titleName: '<',
      backName: '<',
      backAction: '&'
    },
    templateUrl: 'breadcrump.html'
})
