/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner
 * @restrict E
 * @description Planner component.
 */
angular.module('webapp').component('waPlanner', {
    controller: 'PlannerCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'planner.html'
    }],
    $routeConfig: [
      {path: '/', name:'PlannerCalendar', component: 'waPlannerCalendar', useAsDefault: true},
      {path: '/:id', name:'PlannerCalendar', component: 'waPlannerCalendar'},
      {path: ':back/session/:id', name:'PlannerSession', component: 'waPlannerSession'},
      {path: ':back/conference/:id', name:'PlannerConference', component: 'waPlannerConference'}
    ],
    $canActivate: ['PlacesService', '$rootRouter', function(PlacesService, $rootRouter) {
      return PlacesService.loadArray()
        .then(function() {
          return true
        })
        .catch(function(error) {
          $rootRouter.navigate(['SessionSearch'])
          return false
        })
    }]
})
