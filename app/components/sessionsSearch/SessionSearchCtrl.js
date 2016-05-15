angular.module('webapp').controller('SessionSearchCtrl', SessionSearchCtrl)
SessionSearchCtrl.$inject = ['SessionsService', 'ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:SessionSearchCtrl
 * @requires SessionsService
 * @requires ConferencesService
 * @description In charge of the sessionCard in SessionSearch view.
 */
function SessionSearchCtrl(SessionsService, ConferencesService) {
  var vm = this
  /**
   * @ngdoc property
   * @name titleName
   * @propertyOf webapp.controller:SessionSearchCtrl
   * @description Name of the controller
   */
  vm.titleName = "Discover"
  /**
   * @ngdoc property
   * @name sessions
   * @propertyOf webapp.controller:SessionSearchCtrl
   * @description List of all sessions for the event
   */
  vm.sessions = []
  /**
   * @ngdoc property
   * @name search
   * @propertyOf webapp.controller:SessionSearchCtrl
   * @description String of the beginning of the sessions searched by the user.
   */
  vm.search = ""
  /**
   * @ngdoc property
   * @name order
   * @propertyOf webapp.controller:SessionSearchCtrl
   * @description Order of the sessions list
   */
  vm.order = "date"

  /**
   * @ngdoc method
   * @name goToConference
   * @methodOf webapp.controller:SessionSearchCtrl
   * @description Redirect to conference view when the conference sessionListConferenceCard is clicked.
   */
  vm.goToConference = function(conference) {
      vm.$router.navigate(['Planner', 'PlannerConference', {
          id: conference.$id,
          data:"backDiscover",
          back: 1
      }])
  }

  /**
   * @ngdoc method
   * @name routerOnActivate
   * @methodOf webapp.controller:SessionSearchCtrl
   * @description Todo before loading the component.
   */
  vm.$routerOnActivate = function(next) {
      vm.sessions = SessionsService.sessions
  }

}
