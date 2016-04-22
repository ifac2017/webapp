/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-places-edit
 * @restrict E
 * @description Admin places edition manager component.
 */
angular.module('webapp').component('waAdminPlacesEdit', {
    controller: 'AdminPlacesEditCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminPlacesEdit.html'
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['AuthService', 'PlacesService', '$rootRouter', function(AuthService, PlacesService, $rootRouter) {
        return AuthService.requireAdminAuth()
            .then(function() {
                PlacesService.loadArray().then(function() {
                        return true
                    })
                    .catch(function(error) {
                        $rootRouter.navigate(['Admin'])
                        return false
                    })
            })
            .catch(function(error) {
                $rootRouter.navigate(['Login'])
                return false
            })
    }]
})
