/**
 * @ngdoc directive
 * @name webapp.directive:wa-admin
 * @restrict E
 * @description Admin component.
 */
angular.module('webapp').component('waAdmin', {
    controller: 'AdminCtrl',
    templateUrl: 'admin.html',
    $routeConfig: [
      {path: '/', name:'AdminDashboard', component: 'waAdminDashboard', useAsDefault: true},
      {path: '/conferences/...', name:'AdminConferences', component: 'waAdminConferences'}
    ],
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
