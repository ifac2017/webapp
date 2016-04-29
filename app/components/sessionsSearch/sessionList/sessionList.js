angular.module('webapp').component('waSessionList', {
  controller: 'SessionListCtrl',
  templateUrl: ['$element', function($element) {
      angular.element($element).addClass('layout-column')
      return 'sessionList.html'
  }],
  $canActivate: ['ConferencesService', 'SessionsService', '$rootRouter', function(ConferencesService, SessionsService, $rootRouter) {
    return SessionsService.loadArray()
      .then(function() {
        return ConferencesService.loadArray()
      })
      .then(function() {
        return true
      })
      .catch(function(error) {
        $rootRouter.navigate(['Planner'])
        return false
      })
  }]
})
