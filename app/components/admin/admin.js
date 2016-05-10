/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin
 * @restrict E
 * @description Admin component.
 */
angular.module('webapp').component('waAdmin', {
    controller: 'AdminCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'admin.html'
    }],
    $routeConfig: [{
        path: '/',
        name: 'AdminDashboard',
        component: 'waAdminDashboard',
        useAsDefault: true
    }, {
        path: '/sessions/...',
        name: 'AdminSessions',
        component: 'waAdminSessions'
    }, {
        path: '/places/...',
        name: 'AdminPlaces',
        component: 'waAdminPlaces'
    }],
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
