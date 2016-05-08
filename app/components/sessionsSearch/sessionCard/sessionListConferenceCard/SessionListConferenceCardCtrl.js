angular.module('webapp').controller('SessionListConferenceCardCtrl', SessionListConferenceCardCtrl)
SessionListConferenceCardCtrl.$inject = ['PlacesService', 'NotificationsService', 'CurrentUser']

function SessionListConferenceCardCtrl(PlacesService, NotificationsService, CurrentUser) {
  var vm = this

  vm.getPlaceById = function(placeId) {
    return PlacesService.getPlaceById(placeId)
  }

  vm.saveConf = function(confId) {
    console.log("Cliked")
  }

  vm.action = function() {
    console.log(vm.conference);
    CurrentUser.saveConference(vm.conference).then(function() {
      NotificationsService.success("Conference saved!")
    }).catch(function(){
      NotificationsService.error("You must be logged to save a conference.")
    })
  }
}
