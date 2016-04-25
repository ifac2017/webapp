angular.module('webapp').controller('AdminPlacesCreateCtrl', AdminPlacesCreateCtrl)
AdminPlacesCreateCtrl.$inject = ['PlacesService', 'Place']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesCreateCtrl
 * @description In charge of the admin places creation view.
 */
function AdminPlacesCreateCtrl(PlacesService, Place) {
    var vm = this

    vm.titleName = "Add new place"
    vm.backName = "Places Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminPlacesDashboard'])
    }

    vm.place = Place

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
