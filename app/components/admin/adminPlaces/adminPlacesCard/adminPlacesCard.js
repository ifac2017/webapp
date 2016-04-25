/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-places-card
 * @restrict E
 * @description Admin places card component.
 */
angular.module('webapp').component('waAdminPlacesCard', {
    controller: 'AdminPlacesCardCtrl',
    bindings: {
        $router: '<',
        place: '<',
        onEdit: '&'
    },
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminPlacesCard.html'
    }],
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
