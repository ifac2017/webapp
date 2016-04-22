angular.module('webapp').controller('AdminPlacesCardCtrl', AdminPlacesCardCtrl)
AdminPlacesCardCtrl.$inject = ['PlacesService', '$mdDialog']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesCardCtrl
 * @description In charge of the admin places card view.
 */
function AdminPlacesCardCtrl(PlacesService, $mdDialog) {
    var vm = this

    vm.removePlace = function(event) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your place?')
            .ariaLabel('Lucky day')
            .targetEvent(event)
            .ok('Yes remove!')
            .cancel('X')
        $mdDialog.show(confirm).then(function() {
            PlacesService.removePlace(vm.place)
        })
    }
}
