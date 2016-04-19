/**
 * @ngdoc directive
 * @name webapp.directive:wa-login
 * @restrict E
 * @description Login component.
 */
angular.module('webapp').component('waLogin', {
    controller: 'LoginCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'login.html'
    }],
    $canActivate: ['AuthService', '$rootRouter', function(AuthService, $rootRouter) {
        return AuthService.requireUnauth()
            .then(function() {
                return true
            })
            .catch(function(error) {
                $rootRouter.navigate(['Planner'])
                return false
            })
    }]
})
