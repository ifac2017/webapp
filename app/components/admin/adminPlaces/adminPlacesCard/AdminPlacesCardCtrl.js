angular.module('webapp').controller('AdminPlacesCardCtrl', AdminPlacesCardCtrl)
AdminPlacesCardCtrl.$inject = ['PlacesService', '$mdDialog', 'NgMap']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminPlacesCardCtrl
 * @description In charge of the admin places card view.
 */
function AdminPlacesCardCtrl(PlacesService, $mdDialog, NgMap) {
    var vm = this

    vm.removePlace = function(event) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this place?')
            .ariaLabel('Remove place')
            .targetEvent(event)
            .ok('Yes remove!')
            .cancel('Cancel')
        $mdDialog.show(confirm).then(function() {
            PlacesService.removePlace(vm.place)
        })
    }
    
    NgMap.getMap({id:'placesMap'}).then(function(map) {
      google.maps.event.trigger(map, 'resize')
    })
}
