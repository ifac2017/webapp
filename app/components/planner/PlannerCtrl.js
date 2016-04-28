angular.module('webapp').controller('PlannerCtrl', PlannerCtrl)
PlannerCtrl.$inject = ['SessionsService', 'EventService', 'moment']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerCtrl
 * @description In charge of the planner view.
 */
function PlannerCtrl(SessionsService, EventService, moment) {
    var vm = this

    vm.titleName = "Planner"

    vm.selectedIndex = 0

    vm.timeslots = []

    vm.days = []

    EventService.loadEvent().then(function() {
        if (EventService.event.start_date && EventService.event.end_date) {
            var start = moment(EventService.event.start_date)
            var end = moment(EventService.event.end_date)
            while (start.isSameOrBefore(end)) {
                vm.days.push(angular.copy(start))
                start.add(1, 'days')
            }
        }

        if (EventService.event.timeslots) {
            EventService.event.timeslots.forEach(function(item) {
                vm.timeslots.push({
                    start_time: new Date(item.start_time),
                    end_time: new Date(item.end_time)
                })
            })
        }

        vm.getSessions(0)

    })

    vm.selectDay = function(index) {
        vm.selectedIndex = index
        vm.getSessions(index)
    }

    vm.getSessions = function(index) {
        SessionsService.getSessionsByDate(vm.days[index]).then(function(sessions) {
            vm.sessions = sessions
        })
    }
}
