/**
 * @ngdoc directive
 * @name webapp.directive:wa-session-card
 * @restrict E
 * @description Card describing one session.
 */
angular.module('webapp').component('waSessionCard', {
  controller: 'SessionCardCtrl',
  templateUrl: ['$element', function($element) {
      angular.element($element).addClass('layout-column')
      return 'sessionCard.html'
  }],
  $canActivate: ['ConferencesService', '$rootRouter', function(ConferencesService, $rootRouter) {
    return ConferencesService.loadArray()
      .then(function() {
        return true
      })
      .catch(function(error) {
        $rootRouter.navigate(['SessionSearch'])
        return false
      })
  }],
  bindings: {
      session: '<',
      conferenceClicked: '&'
  }
})
