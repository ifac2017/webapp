angular.module('webapp').controller('AdminPlacesDashboardCtrl', AdminPlacesDashboardCtrl)
AdminPlacesDashboardCtrl.$inject = ['NotificationsService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesDashboardCtrl
 * @description In charge of the admin places dashboard view.
 */
function AdminPlacesDashboardCtrl(NotificationsService, PlacesService) {
    var vm = this

    vm.titleName = "Places Dashboard"
    vm.backName = "Admin Dashboard"
    vm.backAction = function() {
        vm.$router.parent.navigate(['AdminDashboard'])
    }

    vm.places = PlacesService.places

    vm.goToPlacesCreate = function() {
        vm.$router.navigate(['AdminPlacesCreate'])
    }

    vm.$routerOnActivate = function(next) {
        if (next.params.data === "creationOkay") {
            NotificationsService.success('The place has been well created!')
        } else if (next.params.data === "editionOkay") {
            NotificationsService.success('The place has been well edited!')
        }
    }
}
