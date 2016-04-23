angular.module('webapp').controller('AdminDashboardCtrl', AdminDashboardCtrl)
AdminDashboardCtrl.$inject = []

/**
 * @ngdoc controller
 * @name webapp.controller:AdminDashboardCtrl
 * @description In charge of the admin dashboard view.
 */
function AdminDashboardCtrl() {
    var vm = this

    vm.titleName = "Admin Dashboard"

    vm.goToSessions = function() {
      vm.$router.navigate(['AdminSessions'])
    }

    vm.goToSessionsCreate = function() {
      vm.$router.navigate(['AdminSessions', 'AdminSessionsCreate'])
    }

    vm.goToPlaces = function() {
      vm.$router.navigate(['AdminPlaces'])
    }

    vm.goToPlacesCreate = function() {
      vm.$router.navigate(['AdminPlaces', 'AdminPlacesCreate'])
    }
}
