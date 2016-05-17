/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner-calendar
 * @restrict E
 * @description Planner calendar component.
 */
angular.module('webapp').component('waPlannerCalendar', {
    controller: 'PlannerCalendarCtrl',
    templateUrl: ['$element', '$mdMedia', function($element, $mdMedia) {
        angular.element($element).addClass('layout-column')
        if ($mdMedia('gt-sm')) {
            return 'plannerCalendar.html'
        } else {
            return 'plannerCalendarMobile.html'
        }
    }],
    bindings: {
        $router: '<'
    },
})
