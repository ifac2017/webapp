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
    vm.textAction = "Save the place"
    vm.iconAction = "save"
    vm.action = function() {
      PlacesService.addPlace(vm.place)
          .then(function() {
              vm.$router.navigate(['AdminPlacesDashboardData', {
                  data: "creationOkay"
              }])
          })
          .catch(function() {})
    }

    vm.place = PlacesService.Model

    vm.$routerOnActivate = function(next, prev) {
        PlacesService.Model.reset()
    }
}
