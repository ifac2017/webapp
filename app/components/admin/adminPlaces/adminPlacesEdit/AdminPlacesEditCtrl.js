angular.module('webapp').controller('AdminPlacesEditCtrl', AdminPlacesEditCtrl)
AdminPlacesEditCtrl.$inject = ['PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesEditCtrl
 * @description In charge of the admin places edition view.
 */
function AdminPlacesEditCtrl(PlacesService) {
    var vm = this

    vm.titleName = "Edit place"
    vm.backName = "Places Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminPlacesDashboard'])
    }

    vm.$routerOnActivate = function(next) {
        vm.place = PlacesService.getPlaceById(next.params.id)
    }

    vm.editPlace = function() {
        PlacesService.savePlace(vm.place)
            .then(function() {
                vm.$router.navigate(['AdminPlacesDashboardData', {
                    data: "editionOkay"
                }])
            })
            .catch(function() {})
    }
}
