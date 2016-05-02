angular.module('webapp').controller('SessionListConferenceCardCtrl', SessionListConferenceCardCtrl)
SessionListConferenceCardCtrl.$inject = ['PlacesService']

function SessionListConferenceCardCtrl(PlacesService) {
  var vm = this

  vm.getPlaceById = function(placeId) {
    return PlacesService.getPlaceById(placeId)
  }

  vm.saveConf = function(confId) {
    console.log("Cliked")
  }
}
