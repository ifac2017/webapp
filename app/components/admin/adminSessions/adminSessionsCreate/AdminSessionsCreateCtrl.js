angular.module('webapp').controller('AdminSessionsCreateCtrl', AdminSessionsCreateCtrl)
AdminSessionsCreateCtrl.$inject = ['SessionsService', 'EventService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsCreateCtrl
 * @description In charge of the admin sessions creation view.
 */
function AdminSessionsCreateCtrl(SessionsService, EventService, PlacesService) {
    var vm = this

    vm.titleName = "Add new session"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminSessionsDashboard'])
    }
    vm.textAction = "Save the session"
    vm.iconAction = "save"
    vm.action = function() {
      vm.session.start_time = vm.timeslot.start_time
      vm.session.end_time = vm.timeslot.end_time
      SessionsService.addSession(vm.session)
          .then(function() {
              vm.$router.navigate(['AdminSessionsDashboardData', {
                  data: "creationSessionOkay"
              }])
          })
          .catch(function() {})
    }

    vm.session = SessionsService.Model
    vm.event = EventService.Model

    vm.places = PlacesService.places

    vm.timeslot = {
        start_time: null,
        end_time: null
    }

    vm.$routerOnActivate = function(next, prev) {
        vm.event.reset()
        SessionsService.Model.reset()
        vm.event.start_date = new Date(EventService.event.start_date)
        vm.event.end_date = new Date(EventService.event.end_date)
        if (EventService.event.timeslots) {
            EventService.event.timeslots.forEach(function(item) {
                vm.event.timeslots.push({
                    start_time: new Date(item.start_time),
                    end_time: new Date(item.end_time)
                })
            })
        }
    }
}
