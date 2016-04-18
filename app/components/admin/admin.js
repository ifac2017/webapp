/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin
 * @restrict E
 * @description Admin component.
 */
angular.module('webapp').component('waAdmin', {
    controller: 'AdminCtrl',
    templateUrl: 'admin.html',
    $canActivate: ['AuthService', '$rootRouter', function(AuthService, $rootRouter) {
        return AuthService.requireAuth()
        .then(function(){
          return true
        })
        .catch(function(error){
          $rootRouter.navigate(['Login'])
          return false
        })
    }]
})
