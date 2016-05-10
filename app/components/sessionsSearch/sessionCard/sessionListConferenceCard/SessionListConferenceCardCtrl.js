angular.module('webapp').controller('SessionListConferenceCardCtrl', SessionListConferenceCardCtrl)
SessionListConferenceCardCtrl.$inject = ['PlacesService', 'NotificationsService', 'CurrentUser']

/**
 * @ngdoc controller
 * @name webapp.controller:SessionListConferenceCardCtrl
 * @requires PlacesService
 * @requires NotificationsService
 * @requires CurrentUser
 * @description Controller of the element of the list of all the conference in a session.
 */
function SessionListConferenceCardCtrl(PlacesService, NotificationsService, CurrentUser) {
  var vm = this

  /**
   * @ngdoc method
   * @name getPlaceById
   * @methodOf webapp.controller:SessionListConferenceCardCtrl
   * @description Get the place from the ID the the place.
   */
  vm.getPlaceById = function(placeId) {
    return PlacesService.getPlaceById(placeId)
  }

  /**
   * @ngdoc method
   * @name saveConf
   * @methodOf webapp.controller:SessionListConferenceCardCtrl
   * @description Save the conference when the save button of this conference is clicked.
   */
  vm.saveConf = function() {
    console.log(vm.conference);
    CurrentUser.saveConference(vm.conference).then(function() {
      NotificationsService.success("Conference saved!")
    }).catch(function(){
      NotificationsService.error("You must be logged to save a conference.")
    })
  }
}
