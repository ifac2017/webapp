/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-create
 * @restrict E
 * @description Admin sessions creation manager component.
 */
angular.module('webapp').component('waAdminSessionsCreate', {
    controller: 'AdminSessionsCreateCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsCreate.html'
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
