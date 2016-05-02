angular.module('webapp').controller('SessionCardCtrl', SessionCardCtrl)
SessionCardCtrl.$inject = ['ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:SessionCardCtrl
 * @requires ConferencesService
 * @description In charge of the sessionCard in sessionSearch view.
 */

function SessionCardCtrl(ConferencesService) {
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
