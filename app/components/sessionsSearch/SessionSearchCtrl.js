angular.module('webapp').controller('SessionSearchCtrl', SessionSearchCtrl)
SessionSearchCtrl.$inject = ['SessionsService', 'ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:SessionSearchCtrl
 * @requires ConferencesService
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
  vm.titleName = "SessionSearch"
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

  vm.goToConference = function(conference) {
      vm.$router.navigate(['Planner', 'PlannerConference', {
          id: conference.$id
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
