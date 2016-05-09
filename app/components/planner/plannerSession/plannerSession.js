/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner-session
 * @restrict E
 * @description Planner session component.
 */
angular.module('webapp').component('waPlannerSession', {
    controller: 'PlannerSessionCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'plannerSession.html'
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['ConferencesService', 'SessionsService', 'PlacesService', '$rootRouter', function(ConferencesService, SessionsService, PlacesService, $rootRouter) {
        return SessionsService.loadArray()
            .then(function() {
                return ConferencesService.loadArray()
            })
            .then(function() {
                return PlacesService.loadArray()
            })
            .then(function() {
                return true
            })
            .catch(function(error) {
                $rootRouter.navigate(['Planner'])
                return false
            })
    }]
})
