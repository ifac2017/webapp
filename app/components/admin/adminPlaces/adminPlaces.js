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
      {path: '/:data', name:'AdminPlacesDashboardData', component: 'waAdminPlacesDashboard'},
      {path: '/create', name:'AdminPlacesCreate', component: 'waAdminPlacesCreate'},
      {path: '/edit/:id', name:'AdminPlacesEdit', component: 'waAdminPlacesEdit'}
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
