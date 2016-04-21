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
    vm.backName = "Conferences Dashboard"
    vm.backAction = function() {
      vm.$router.navigate(['AdminConferencesDashboard'])
    }

    vm.conference = {
      date: new Date(),
      place: null,
      speaker: null,
      duration: null,
      topic: null
    }
}
