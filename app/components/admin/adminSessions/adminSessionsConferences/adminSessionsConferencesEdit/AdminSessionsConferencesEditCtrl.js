angular.module('webapp').controller('AdminSessionsConferencesEditCtrl', AdminSessionsConferencesEditCtrl)
AdminSessionsConferencesEditCtrl.$inject = ['SessionsService', 'ConferencesService', 'Speaker', 'NotificationsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsConferencesEditCtrl
 * @description In charge of the admin sessions conferences edition view.
 */
function AdminSessionsConferencesEditCtrl(SessionsService, ConferencesService, Speaker, NotificationsService) {
    var vm = this

    vm.titleName = "Edit conferences"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.parent.parent.navigate(['AdminSessionsDashboard'])
    }

    vm.speaker = Speaker

    vm.$routerOnActivate = function(next) {
        var sessionId = vm.$router.parent.parent._currentInstruction.component.params.id
        vm.session = SessionsService.getSessionById(sessionId)
        vm.conference = ConferencesService.getConferenceById(next.params.id)
        vm.date = new Date(vm.session.date)
        vm.start_time = new Date(vm.conference.start_time)
        vm.end_time = new Date(vm.conference.end_time)
    }

    vm.addSpeaker = function() {
        var speaker = angular.copy(vm.speaker)
        vm.conference.speakers.push(speaker)
        vm.editConference()
        vm.speaker.name = null
        vm.speaker.institution = null
    }

    vm.removeSpeaker = function(speaker) {
        vm.conference.speakers.splice(vm.conference.speakers.indexOf(speaker), 1)
    }

    vm.editConference = function() {
        vm.conference.start_time = vm.start_time.getTime()
        vm.conference.end_time = vm.end_time.getTime()
        ConferencesService.saveConference(vm.conference)
            .then(function() {
                NotificationsService.success('The place has been well edited!')
            })
            .catch(function() {
                NotificationsService.error('An error occurred... Please try again.')
            })
    }
}
