/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-conferences
 * @restrict E
 * @description Admin conferences manager component.
 */
angular.module('webapp').component('waAdminConferences', {
    controller: 'AdminConferencesCtrl',
    bindings: {
        $router: '<'
    },
    $routeConfig: [
      {path: '/', name:'AdminConferencesDashboard', component: 'waAdminConferencesDashboard', useAsDefault: true},
      {path: '/create', name:'AdminConferencesCreate', component: 'waAdminConferencesCreate'}
    ],
    templateUrl: 'adminConferences.html',
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
