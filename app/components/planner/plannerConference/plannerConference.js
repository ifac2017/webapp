/**
 * @ngdoc directive
 * @name webapp.directive:wa-planner-conference
 * @restrict E
 * @description Planner conference component.
 */
angular.module('webapp').component('waPlannerConference', {
    controller: 'PlannerConferenceCtrl',
    templateUrl: ['$element', '$mdMedia', function($element, $mdMedia) {
        angular.element($element).addClass('layout-column')
        if ($mdMedia('gt-sm')) {
            return 'plannerConference.html'
        } else {
            return 'plannerConferenceMobile.html'
        }
    }],
    bindings: {
        $router: '<'
    },
    $canActivate: ['ConferencesService', 'PlacesService', '$rootRouter', function(ConferencesService, PlacesService, $rootRouter) {
        return ConferencesService.loadArray()
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
