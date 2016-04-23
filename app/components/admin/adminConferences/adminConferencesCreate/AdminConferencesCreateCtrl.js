angular.module('webapp').controller('AdminConferencesCreateCtrl', AdminConferencesCreateCtrl)
AdminConferencesCreateCtrl.$inject = []

/**
 * @ngdoc controller
 * @name webapp.controller:AdminConferencesCreateCtrl
 * @description In charge of the admin conferences creation view.
 */
function AdminConferencesCreateCtrl() {
    var vm = this

    vm.titleName = "Add new conference"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
      vm.$router.navigate(['AdminSessionsDashboard'])
    }

    vm.conference = {
      start_time: null,
      end_time: null,
      place: Place,
      room: null,
      speakers: [],
      session: null,
      abstract: null,
      name: null,
    }
}
