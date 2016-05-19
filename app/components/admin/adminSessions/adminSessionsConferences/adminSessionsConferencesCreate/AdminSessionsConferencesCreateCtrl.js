angular.module('webapp').controller('AdminSessionsConferencesCreateCtrl', AdminSessionsConferencesCreateCtrl)
AdminSessionsConferencesCreateCtrl.$inject = ['ConferencesService', 'SessionsService', 'Speaker']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsConferencesCreateCtrl
 * @description In charge of the admin sessions conferences creation view.
 */
function AdminSessionsConferencesCreateCtrl(ConferencesService, SessionsService, Speaker) {
    var vm = this

    vm.titleName = "Add new conference"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.parent.parent.navigate(['AdminSessionsDashboard'])
    }
    vm.textAction = "Save the conference"
    vm.iconAction = "save"
    vm.action = function() {
      ConferencesService.addConference(vm.conference, vm.session)
          .then(function() {
              vm.$router.parent.parent.navigate(['AdminSessionsDashboardData', {
                  data: "creationConferenceOkay"
              }])
          })
          .catch(function() {})
    }

    vm.speaker = Speaker

    vm.conference = ConferencesService.Model

    vm.$routerOnActivate = function(next, prev) {
        ConferencesService.Model.reset()
        var sessionId = vm.$router.parent.parent._currentInstruction.component.params.id
        vm.session = SessionsService.getSessionById(sessionId)
        vm.conference.date = new Date(vm.session.date)
        vm.conference.sessionId = vm.session.$id
        vm.conference.start_time = new Date(vm.session.start_time)
        vm.conference.end_time = new Date(vm.session.end_time)
    }

    vm.addSpeaker = function() {
        var speaker = angular.copy(vm.speaker)
        vm.conference.speakers.push(speaker)
        vm.speaker.name = null
        vm.speaker.institution = null
    }

    vm.removeSpeaker = function(speaker) {
        vm.conference.speakers.splice(vm.conference.speakers.indexOf(speaker), 1)
    }
}
