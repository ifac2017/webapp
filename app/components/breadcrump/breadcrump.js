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
      textAction: '<',
      iconAction: '<',
      action: '&',
      backAction: '&'
    },
    templateUrl: 'breadcrump.html'
})
