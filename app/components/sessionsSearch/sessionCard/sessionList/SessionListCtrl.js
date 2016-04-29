angular.module('webapp').controller('SessionListCtrl', SessionListCtrl)
SessionListCtrl.$inject = ['PlacesService']

function SessionListCtrl(PlacesService) {
  var vm = this
  console.log(vm.conferences);

  vm.getPlaceById = function(placeId) {
    return PlacesService.getPlaceById(placeId)
  }
}
