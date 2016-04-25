/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-conferences
 * @restrict E
 * @description Admin sessions conferences manager component.
 */
angular.module('webapp').component('waAdminSessionsConferences', {
    controller: 'AdminSessionsConferencesCtrl',
    bindings: {
        $router: '<'
    },
    $routeConfig: [{
        path: '/create',
        name: 'AdminSessionsConferencesCreate',
        component: 'waAdminSessionsConferencesCreate',
        useAsDefault: true
    }, {
        path: '/edit/:idConference',
        name: 'AdminSessionsConferencesEdit',
        component: 'waAdminSessionsConferencesEdit'
    }],
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsConferences.html'
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
