angular.module('webapp').controller('AdminPlacesDashboardCtrl', AdminPlacesDashboardCtrl)
AdminPlacesDashboardCtrl.$inject = []

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesDashboardCtrl
 * @description In charge of the admin places dashboard view.
 */
function AdminPlacesDashboardCtrl() {
    var vm = this

    vm.titleName = "Places Dashboard"
    vm.backName = "Admin Dashboard"
    vm.backAction = function() {
      vm.$router.parent.navigate(['AdminDashboard'])
    }

    vm.goToPlacesCreate = function() {
      vm.$router.navigate(['AdminPlacesCreate'])
    }
}
