angular.module('webapp').controller('SessionSearchCtrl', SessionSearchCtrl)
SessionSearchCtrl.$inject = ['SessionsService', 'ConferencesService']

function SessionSearchCtrl(SessionsService, ConferencesService) {
  var vm = this
  vm.titleName = "SessionSearch"
  vm.sessions = []
  vm.sessionActivated = null
  vm.conferences = []

  vm.$routerOnActivate = function(next) {
      vm.sessions = SessionsService.sessions
  }

  vm.selectSession = function(session) {
    console.log(session)
    vm.conferences = []
    vm.sessionActivated = session
    if(typeof session.conferences !== 'undefined' ){
      for (var i = 0; i < session.conferences.length; i++) {
          vm.conferences.push(ConferencesService.getConferenceById(vm.sessionActivated.conferences[i]))
      }
    }
    console.log(vm.conferences)
    console.log(vm.sessionActivated)
  }
}
