/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner-session
 * @restrict E
 * @description Planner session component.
 */
angular.module('webapp').component('waPlannerSession', {
    controller: 'PlannerSessionCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'plannerSession.html'
    }]
})
