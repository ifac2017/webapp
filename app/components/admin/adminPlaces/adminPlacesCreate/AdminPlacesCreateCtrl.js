angular.module('webapp').controller('AdminPlacesCreateCtrl', AdminPlacesCreateCtrl)
AdminPlacesCreateCtrl.$inject = ['PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesCreateCtrl
 * @description In charge of the admin places creation view.
 */
function AdminPlacesCreateCtrl(PlacesService) {
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
        maxCapacity: 100
    }

    vm.addPlace = function() {
        PlacesService.addPlace(vm.place)
            .then(function() {
                vm.$router.navigate(['AdminPlacesDashboardData', {
                    data: "creationOkay"
                }])
            })
            .catch(function() {})
    }
}
