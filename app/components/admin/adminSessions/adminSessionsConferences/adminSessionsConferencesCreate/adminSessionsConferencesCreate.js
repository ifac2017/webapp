/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-conferences-create
 * @restrict E
 * @description Admin sessions conferences creation manager component.
 */
angular.module('webapp').component('waAdminSessionsConferencesCreate', {
    controller: 'AdminSessionsConferencesCreateCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsConferencesCreate.html'
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['AuthService', 'SessionsService', '$rootRouter', function(AuthService, SessionsService, $rootRouter) {
        return AuthService.requireAdminAuth()
            .then(function() {
                SessionsService.loadArray().then(function() {
                        return true
                    })
                    .catch(function(error) {
                        $rootRouter.navigate(['Admin', 'AdminSessions'])
                        return false
                    })
            })
            .catch(function(error) {
                $rootRouter.navigate(['Login'])
                return false
            })
    }]
})
