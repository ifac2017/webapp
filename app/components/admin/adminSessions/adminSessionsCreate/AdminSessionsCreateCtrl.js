angular.module('webapp').controller('AdminSessionsCreateCtrl', AdminSessionsCreateCtrl)
AdminSessionsCreateCtrl.$inject = ['SessionsService', 'EventService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsCreateCtrl
 * @description In charge of the admin sessions creation view.
 */
function AdminSessionsCreateCtrl(SessionsService, EventService) {
    var vm = this

    vm.titleName = "Add new session"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminSessionsDashboard'])
    }

    vm.session = SessionsService.Model
    vm.event = EventService.Model

    vm.addSession = function() {
        SessionsService.addSession(vm.session)
            .then(function() {
                vm.$router.navigate(['AdminSessionsDashboardData', {
                    data: "creationSessionOkay"
                }])
            })
            .catch(function() {})
    }

    vm.$routerOnActivate = function(next, prev) {
        SessionsService.Model.reset()
        vm.event.start_date = new Date(EventService.event.start_date)
        vm.event.end_date = new Date(EventService.event.end_date)
    }
}
