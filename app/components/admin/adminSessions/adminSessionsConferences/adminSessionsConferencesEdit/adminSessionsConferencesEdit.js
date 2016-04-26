/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-conferences-edit
 * @restrict E
 * @description Admin sessions conferences creation manager component.
 */
angular.module('webapp').component('waAdminSessionsConferencesEdit', {
    controller: 'AdminSessionsConferencesEditCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsConferencesEdit.html'
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
