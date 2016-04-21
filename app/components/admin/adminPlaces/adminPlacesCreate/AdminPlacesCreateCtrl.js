angular.module('webapp').controller('AdminPlacesCreateCtrl', AdminPlacesCreateCtrl)
AdminPlacesCreateCtrl.$inject = []

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesCreateCtrl
 * @description In charge of the admin places creation view.
 */
function AdminPlacesCreateCtrl() {
    var vm = this

    vm.titleName = "Add new place"
    vm.backName = "Places Dashboard"
    vm.backAction = function() {
      vm.$router.navigate(['AdminPlacesDashboard'])
    }

    vm.place = {
      name: null,
      address: null,
      floor: null,
      maxCapacity: null
    }
}
