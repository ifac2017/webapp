/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner
 * @restrict E
 * @description Planner component.
 */
angular.module('webapp').component('waPlanner', {
    controller: 'PlannerCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'planner.html'
    }]
})
