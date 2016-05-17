angular.module('webapp').controller('AdminPlacesDashboardCtrl', AdminPlacesDashboardCtrl)
AdminPlacesDashboardCtrl.$inject = ['NotificationsService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesDashboardCtrl
 * @description In charge of the admin places dashboard view.
 */
function AdminPlacesDashboardCtrl(NotificationsService, PlacesService) {
    var vm = this

    // breadcrump
    vm.titleName = "Places Dashboard"
    vm.backName = "Admin Dashboard"
    vm.textAction = "Add a new place"
    vm.iconAction = "add"
    vm.action = function() {
        vm.$router.navigate(['AdminPlacesCreate'])
    }
    vm.backAction = function() {
        vm.$router.parent.navigate(['AdminDashboard'])
    }
    // end breadcrump

    vm.places = PlacesService.places

    vm.editPlace = function(place) {
        vm.$router.navigate(['AdminPlacesEdit', {
            id: place.$id
        }])
    }

    vm.$routerOnActivate = function(next) {
        if (next.params.data === "creationOkay") {
            NotificationsService.success('The place has been well created!')
        }
    }
}
