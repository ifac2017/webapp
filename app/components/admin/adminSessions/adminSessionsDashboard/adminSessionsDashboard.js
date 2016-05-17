/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-dashboard
 * @restrict E
 * @description Admin sessions dashboard manager component.
 */
angular.module('webapp').component('waAdminSessionsDashboard', {
    controller: 'AdminSessionsDashboardCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsDashboard.html'
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['AuthService', 'PlacesService', '$rootRouter', function(AuthService, PlacesService, $rootRouter) {
        return AuthService.requireAdminAuth()
        .then(function(){
          return PlacesService.loadArray()
        })
        .then(function(){
          return true
        })
        .catch(function(error){
          $rootRouter.navigate(['Login'])
          return false
        })
    }]
})
