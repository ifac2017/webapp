/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-edit
 * @restrict E
 * @description Admin sessions edition manager component.
 */
angular.module('webapp').component('waAdminSessionsEdit', {
    controller: 'AdminSessionsEditCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsEdit.html'
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
