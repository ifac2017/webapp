angular.module('webapp').controller('AdminPlacesEditCtrl', AdminPlacesEditCtrl)
AdminPlacesEditCtrl.$inject = ['PlacesService', 'NotificationsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesEditCtrl
 * @description In charge of the admin places edition view.
 */
function AdminPlacesEditCtrl(PlacesService, NotificationsService) {
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
              NotificationsService.success('The place has been well edited!')
            })
            .catch(function() {
              NotificationsService.error('An error occurred... Please try again.')
            })
    }
}
