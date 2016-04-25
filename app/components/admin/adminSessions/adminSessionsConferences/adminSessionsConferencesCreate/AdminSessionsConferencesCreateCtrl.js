angular.module('webapp').controller('AdminSessionsConferencesCreateCtrl', AdminSessionsConferencesCreateCtrl)
AdminSessionsConferencesCreateCtrl.$inject = ['SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsConferencesCreateCtrl
 * @description In charge of the admin sessions conferences creation view.
 */
function AdminSessionsConferencesCreateCtrl(SessionsService) {
    var vm = this

    vm.titleName = "Add new conference"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminSessionsDashboard'])
    }

    vm.speaker = {
      name: null,
      origin: null
    }

    vm.conference = {
        name: null,
        date: null,
        start_time: null,
        end_time: null,
        place: null,
        room: null,
        speakers: [{
          name:'Gautier Delorme',
          origin: 'INSA Toulouse'
        }],
        session: null,
        abstract: null
    }

    vm.$routerOnActivate = function(next, prev) {
        vm.session = SessionsService.getSessionById(next.params.id)
        vm.conference.date = new Date(vm.session.date)
        vm.conference.session = vm.session.$id
        vm.conference.start_time = new Date(vm.session.start_time)
        vm.conference.end_time = new Date(vm.session.end_time)
    }

    vm.addSpeaker = function() {
      var speaker = angular.copy(vm.speaker)
      vm.conference.speakers.push(speaker)
      vm.speaker.name = null
      vm.speaker.origin = null
    }

    vm.addConference = function() {

    }
}
