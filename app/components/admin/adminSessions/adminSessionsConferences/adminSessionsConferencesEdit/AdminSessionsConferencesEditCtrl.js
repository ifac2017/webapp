angular.module('webapp').controller('AdminSessionsConferencesEditCtrl', AdminSessionsConferencesEditCtrl)
AdminSessionsConferencesEditCtrl.$inject = ['SessionsService', 'ConferencesService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsConferencesEditCtrl
 * @description In charge of the admin sessions conferences edition view.
 */
function AdminSessionsConferencesEditCtrl(SessionsService, ConferencesService, PlacesService) {
    var vm = this

    vm.titleName = "Edit conferences"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.parent.parent.navigate(['AdminSessionsDashboard'])
    }

    vm.places = PlacesService.places

    vm.$routerOnActivate = function(next) {
        var sessionId = vm.$router.parent.parent._currentInstruction.component.params.id
        vm.session = SessionsService.getSessionById(sessionId)
        vm.conference = ConferencesService.getConferenceById(next.params.id)
        vm.date = new Date(vm.session.date)
        vm.start_time = new Date(vm.conference.start_time)
        vm.end_time = new Date(vm.conference.end_time)
    }

    vm.editConference = function() {
        vm.conference.start_time = vm.start_time.getTime()
        vm.conference.end_time = vm.end_time.getTime()
        ConferencesService.saveConference(vm.conference)
            .then(function() {
                vm.$router.parent.parent.navigate(['AdminSessionsDashboardData', {
                    data: "editionConferenceOkay"
                }])
            })
            .catch(function() {})
    }
}
