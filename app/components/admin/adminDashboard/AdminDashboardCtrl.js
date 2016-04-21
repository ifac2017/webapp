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

    vm.goToConferences = function() {
      vm.$router.navigate(['AdminConferences'])
    }

    vm.goToPlaces = function() {
      vm.$router.navigate(['AdminPlaces'])
    }
}
