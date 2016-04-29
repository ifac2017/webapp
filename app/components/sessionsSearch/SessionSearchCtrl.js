angular.module('webapp').controller('SessionSearchCtrl', SessionSearchCtrl)
SessionSearchCtrl.$inject = ['SessionsService', 'ConferencesService']

function SessionSearchCtrl(SessionsService, ConferencesService) {
  var vm = this
  vm.titleName = "SessionSearch"
  vm.sessions = []
  vm.sessionActivated = null
  vm.conferences = []

}
