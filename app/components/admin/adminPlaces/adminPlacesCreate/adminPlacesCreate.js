/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-places-create
 * @restrict E
 * @description Admin places creation manager component.
 */
angular.module('webapp').component('waAdminPlacesCreate', {
    controller: 'AdminPlacesCreateCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminPlacesCreate.html'
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
