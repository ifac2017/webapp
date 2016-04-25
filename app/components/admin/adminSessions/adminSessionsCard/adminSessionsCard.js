/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions-card
 * @restrict E
 * @description Admin sessions card component.
 */
angular.module('webapp').component('waAdminSessionsCard', {
    controller: 'AdminSessionsCardCtrl',
    bindings: {
        $router: '<',
        session: '<',
        onEdit: '&',
        onAdd: '&'
    },
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessionsCard.html'
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
