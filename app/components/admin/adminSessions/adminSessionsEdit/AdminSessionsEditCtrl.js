angular.module('webapp').controller('AdminSessionsEditCtrl', AdminSessionsEditCtrl)
AdminSessionsEditCtrl.$inject = ['SessionsService', 'EventService', 'PlacesService', 'NotificationsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsEditCtrl
 * @description In charge of the admin sessions edition view.
 */
function AdminSessionsEditCtrl(SessionsService, EventService, PlacesService, NotificationsService) {
    var vm = this

    vm.titleName = "Edit session"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminSessionsDashboard'])
    }

    vm.event = EventService.Model

    vm.places = PlacesService.places

    vm.timeslot = {
        start_time: null,
        end_time: null
    }

    vm.$routerOnActivate = function(next) {
        vm.event.reset()
        vm.session = SessionsService.getSessionById(next.params.id)
        vm.date = new Date(vm.session.date)
        vm.timeslot.start_time = new Date(vm.session.start_time)
        vm.timeslot.end_time = new Date(vm.session.end_time)


        vm.event.start_date = new Date(EventService.event.start_date)
        vm.event.end_date = new Date(EventService.event.end_date)

        if (EventService.event.timeslots) {
            EventService.event.timeslots.forEach(function(item) {
                if (item.start_time === vm.timeslot.start_time.getTime() && item.end_time === vm.timeslot.end_time.getTime()) {
                    vm.event.timeslots.push(vm.timeslot)
                } else {
                    vm.event.timeslots.push({
                        start_time: new Date(item.start_time),
                        end_time: new Date(item.end_time)
                    })
                }
            })
        }
    }

    vm.editSession = function() {
        vm.session.date = vm.date.getTime()
        vm.session.start_time = vm.timeslot.start_time.getTime()
        vm.session.end_time = vm.timeslot.end_time.getTime()
        SessionsService.saveSession(vm.session)
            .then(function() {
                NotificationsService.success('The session has been well edited!')
            })
            .catch(function() {
                NotificationsService.error('An error occurred... Please try again.')
            })
    }
}
