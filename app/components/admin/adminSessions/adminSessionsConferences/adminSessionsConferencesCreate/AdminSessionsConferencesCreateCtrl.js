angular.module('webapp').controller('AdminSessionsConferencesCreateCtrl', AdminSessionsConferencesCreateCtrl)
AdminSessionsConferencesCreateCtrl.$inject = ['ConferencesService', 'SessionsService', 'Conference', 'Speaker', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsConferencesCreateCtrl
 * @description In charge of the admin sessions conferences creation view.
 */
function AdminSessionsConferencesCreateCtrl(ConferencesService, SessionsService, Conference, Speaker, PlacesService) {
    var vm = this

    vm.titleName = "Add new conference"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminSessionsDashboard'])
    }

    vm.speaker = Speaker

    vm.conference = Conference

    vm.places = PlacesService.places

    vm.$routerOnActivate = function(next, prev) {
        vm.session = SessionsService.getSessionById(next.params.id)
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

    vm.addConference = function() {
      ConferencesService.addConference(vm.conference, vm.session)
          .then(function() {
              vm.$router.navigate(['AdminSessionsDashboardData', {
                  data: "creationConferenceOkay"
              }])
          })
          .catch(function() {})
    }
}
