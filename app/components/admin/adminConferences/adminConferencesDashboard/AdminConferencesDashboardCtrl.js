angular.module('webapp').controller('AdminConferencesDashboardCtrl', AdminConferencesDashboardCtrl)
AdminConferencesDashboardCtrl.$inject = []

/**
 * @ngdoc controller
 * @name webapp.controller:AdminConferencesCreateCtrl
 * @description In charge of the admin conferences dashboard view.
 */
function AdminConferencesDashboardCtrl() {
    var vm = this

    vm.titleName = "Conferences Dashboard"
    vm.backName = "Admin Dashboard"
    vm.backAction = function() {
      vm.$router.parent.navigate(['AdminDashboard'])
    }

    vm.goToConferencesCreate = function() {
      vm.$router.navigate(['AdminConferencesCreate'])
    }
}
