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

  vm.$selectSession = function(idSession){
    vm.sessionActivated = SessionsService.getSessionById(idSession)
    for (var i = 0; i < vm.sessionActivated.conferences.length; i++) {
        vm.conferences.push(ConferencesService.getConferenceById(vm.sessionActivated.conferences[i]))
    }
  }
}
