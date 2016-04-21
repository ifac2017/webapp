/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-places-dashboard
 * @restrict E
 * @description Admin places dashboard manager component.
 */
angular.module('webapp').component('waAdminPlacesDashboard', {
    controller: 'AdminPlacesDashboardCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminPlacesDashboard.html'
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
