/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-dashboard
 * @restrict E
 * @description Admin dashboard component.
 */
angular.module('webapp').component('waAdminDashboard', {
    controller: 'AdminDashboardCtrl',
    bindings: {
        $router: '<'
    },
    templateUrl: 'adminDashboard.html',
    $canActivate: ['AuthService', '$rootRouter', function(AuthService, $rootRouter) {
        return AuthService.requireAdminAuth()
            .then(function() {
                return true
            })
            .catch(function(error) {
                $rootRouter.navigate(['Login'])
                return false
            })
    }]
})
