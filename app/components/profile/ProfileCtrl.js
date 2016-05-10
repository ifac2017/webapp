angular.module('webapp').controller('ProfileCtrl', ProfileCtrl)
ProfileCtrl.$inject = ['PlacesService', 'CurrentUser', 'SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:ProfileCtrl
 * @requires CurrentUser
 * @description In charge of the profile view.
 */
function ProfileCtrl(PlacesService, CurrentUser, SessionsService) {
    var vm = this

    vm.titleName = "Conferences saved"

    vm.goToConference = function(conference) {
      vm.$router.navigate(['Planner', 'PlannerConference', {
        id: conference.$id
      }])
    }

    /**
     * @ngdoc property
     * @name currentUser
     * @propertyOf webapp.controller:SidebarCtrl
     * @description Current logged user
     */
    vm.currentUser = CurrentUser

    vm.getPlaceById = function(placeId) {
      return PlacesService.getPlaceById(placeId)
    }

    vm.getPlaceByConf = function(conference){
      return PlacesService.getPlaceById(SessionsService.getSessionById(conference.sessionId).placeId)
    }

    vm.getRoomByConf = function(conference){
      return SessionsService.getSessionById(conference.sessionId).room
    }

    vm.$routerOnActivate = function() {
      CurrentUser.getConferences().then(function(conferences) {
          vm.conferences = conferences
      }).catch(function(error){
        console.log(error)
        vm.conferences = []
      })
    }
}
