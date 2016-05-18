angular.module('webapp').controller('PlannerCalendarCtrl', PlannerCalendarCtrl)
PlannerCalendarCtrl.$inject = ['SessionsService', 'EventService', 'moment']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerCalendarCtrl
 * @description In charge of the planner calendar view.
 */
function PlannerCalendarCtrl(SessionsService, EventService, moment) {
    var vm = this

    vm.titleName = "Planner"

    vm.selectedIndex = 0

    vm.timeslots = []

    vm.days = []

    vm.sessions = null

    vm.$routerOnActivate = function(next) {
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
                vm.selectedTimeslot = vm.timeslots[0]
            }
            if (next.params.id) {
              vm.selectedIndex = next.params.id
              vm.getSessions(next.params.id)
            } else {
              vm.getSessions(0)
            }
        })
    }

    vm.selectDay = function(index) {
        vm.selectedIndex = index
        vm.getSessions(vm.selectedIndex)
    }

    vm.selectDayMobile = function(index) {
        vm.$router.navigate(['PlannerCalendar', {
            id: index
        }])
    }

    vm.getSessions = function(index) {
        SessionsService.getSessionsByDate(vm.days[index]).then(function(sessions) {
            vm.sessions = sessions
        })
    }

    vm.showSession = function(session) {
        vm.$router.navigate(['PlannerSession', {
            id: session.$id,
            back: ""+vm.selectedIndex+""
        }])
    }
}
