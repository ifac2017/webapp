/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-places
 * @restrict E
 * @description Admin places manager component.
 */
angular.module('webapp').component('waAdminPlaces', {
    controller: 'AdminPlacesCtrl',
    bindings: {
        $router: '<'
    },
    $routeConfig: [
      {path: '/', name:'AdminPlacesDashboard', component: 'waAdminPlacesDashboard', useAsDefault: true},
      {path: '/create', name:'AdminPlacesCreate', component: 'waAdminPlacesCreate'},
      {path: '/:creationOkay', name:'AdminPlacesDashboardAfterCreate', component: 'waAdminPlacesDashboard'}
    ],
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminPlaces.html'
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
