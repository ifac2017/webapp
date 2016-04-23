/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin-sessions
 * @restrict E
 * @description Admin sessions manager component.
 */
angular.module('webapp').component('waAdminSessions', {
    controller: 'AdminSessionsCtrl',
    bindings: {
        $router: '<'
    },
    $routeConfig: [
      {path: '/', name:'AdminSessionsDashboard', component: 'waAdminSessionsDashboard', useAsDefault: true},
      {path: '/:data', name:'AdminSessionsDashboardData', component: 'waAdminSessionsDashboard'},
      {path: '/create', name:'AdminSessionsCreate', component: 'waAdminSessionsCreate'}
    ],
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'adminSessions.html'
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
