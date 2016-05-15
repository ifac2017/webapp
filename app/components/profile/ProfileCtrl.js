angular.module('webapp').controller('ProfileCtrl', ProfileCtrl)
ProfileCtrl.$inject = ['PlacesService', 'ConferencesService', 'CurrentUser', 'SessionsService', '$mdDialog']

/**
 * @ngdoc controller
 * @name webapp.controller:ProfileCtrl
 * @requires CurrentUser
 * @description In charge of the profile view.
 */
function ProfileCtrl(PlacesService, ConferencesService, CurrentUser, SessionsService, $mdDialog) {
    var vm = this

    vm.titleName = "Conferences saved"
    vm.icon = "print"
    vm.textAction = "Print"

    vm.goToConference = function(conference) {
        vm.$router.navigate(['Planner', 'PlannerConference', {
          id: conference.$id,
          data:"backProfile",
          back: 1
        }])
    }

    /**
     * @ngdoc property
     * @name currentUser
     * @propertyOf webapp.controller:SidebarCtrl
     * @description Current logged user
     */
    vm.currentUser = CurrentUser

    vm.removeConference = function(conference) {
      var confirm = $mdDialog.confirm()
          .title('Would you like to unsubscribe yourself from this conference?')
          .ariaLabel('Unsubscribe')
          .targetEvent(event)
          .ok('Unsubscribe!')
          .cancel('Cancel')
      $mdDialog.show(confirm).then(function() {
        vm.conferences.splice(vm.conferences.indexOf(conference), 1)
        CurrentUser.removeConference(conference)
      })
    }

    vm.print = function() {
        window.print()
    }

    vm.getPlaceById = function(placeId) {
        return PlacesService.getPlaceById(placeId)
    }

    vm.getPlaceByConf = function(conference) {
        return PlacesService.getPlaceById(SessionsService.getSessionById(conference.sessionId).placeId)
    }

    vm.getRoomByConf = function(conference) {
        return SessionsService.getSessionById(conference.sessionId).room
    }

    vm.$routerOnActivate = function() {
        vm.conferences = ConferencesService.getConferencesOfCurrentUser()
    }
}
