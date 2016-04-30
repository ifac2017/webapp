angular.module('webapp').controller('SessionListCtrl', SessionListCtrl)
SessionListCtrl.$inject = ['PlacesService']

function SessionListCtrl(PlacesService) {
  var vm = this

  vm.getPlaceById = function(placeId) {
    return PlacesService.getPlaceById(placeId)
  }

  vm.showConference = function(placeId) {
    console.log("Clické")
  }
}
