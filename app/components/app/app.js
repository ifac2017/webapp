/**
 * @ngdoc directive
 * @name webapp.directive:wa-app
 * @restrict E
 * @description App component.
 */
angular.module('webapp').component('waApp', {
    templateUrl: 'app.html',
    controller: 'AppCtrl',
    $routeConfig: [
      {path: '/planner/...', name:'Planner', component: 'waPlanner', useAsDefault: true},
      {path: '/login', name:'Login', component: 'waLogin'},
      {path: '/profile', name:'Profile', component: 'waProfile'},
      {path: '/admin/...', name:'Admin', component: 'waAdmin'}
    ]
})
