angular.module('webapp').controller('SessionCardCtrl', SessionCardCtrl)
SessionCardCtrl.$inject = ['SessionsService', 'ConferencesService']

function SessionCardCtrl(SessionsService, ConferencesService) {
  var vm = this
  vm.session = vm.session
  vm.sessionActivated = false
  vm.conferences = []

  if(typeof vm.session.conferences !== 'undefined' ){
    for (var i = 0; i < vm.session.conferences.length; i++) {
        vm.conferences.push(ConferencesService.getConferenceById(vm.session.conferences[i]))
    }
  }

  vm.selectSession = function(session) {
    vm.sessionActivated = !vm.sessionActivated
  }
}
