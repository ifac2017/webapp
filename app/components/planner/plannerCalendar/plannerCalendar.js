/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner-calendar
 * @restrict E
 * @description Planner calendar component.
 */
angular.module('webapp').component('waPlannerCalendar', {
    controller: 'PlannerCalendarCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'plannerCalendar.html'
    }],
    bindings: {
        $router: '<'
    },
})
