/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner-conference
 * @restrict E
 * @description Planner conference component.
 */
angular.module('webapp').component('waPlannerConference', {
    controller: 'PlannerConferenceCtrl',
    templateUrl: ['$element', function($element) {
        angular.element($element).addClass('layout-column')
        return 'plannerConference.html'
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['ConferencesService', '$rootRouter', function(ConferencesService, $rootRouter) {
        return ConferencesService.loadArray().then(function() {
                return true
            })
            .catch(function(error) {
                $rootRouter.navigate(['Planner'])
                return false
            })
    }]
})
