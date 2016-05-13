/**
 * @ngdoc directive
 * @name webapp.directive:wa-calendar-session-card
 * @restrict E
 * @description Planner calendar session card component.
 */
angular.module('webapp').component('waCalendarSessionCard', {
    controller: 'CalendarSessionCardCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'calendarSessionCard.html'
    }],
    bindings: {
        session: '<',
        sessionClicked: '&'
    }
})
