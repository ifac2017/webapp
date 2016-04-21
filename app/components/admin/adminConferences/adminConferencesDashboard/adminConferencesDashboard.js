/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-conferences-dashboard
 * @restrict E
 * @description Admin conferences dashboard manager component.
 */
angular.module('webapp').component('waAdminConferencesDashboard', {
    controller: 'AdminConferencesDashboardCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminConferencesDashboard.html'
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['AuthService', '$rootRouter', function(AuthService, $rootRouter) {
        return AuthService.requireAdminAuth()
        .then(function(){
          return true
        })
        .catch(function(error){
          $rootRouter.navigate(['Login'])
          return false
        })
    }]
})
