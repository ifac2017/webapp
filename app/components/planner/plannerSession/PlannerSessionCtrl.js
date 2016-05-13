angular.module('webapp').controller('PlannerSessionCtrl', PlannerSessionCtrl)
PlannerSessionCtrl.$inject = ['SessionsService', 'ConferencesService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerSessionCtrl
 * @description In charge of the planner session view.
 */
function PlannerSessionCtrl(SessionsService, ConferencesService, PlacesService) {
    var vm = this

    vm.backName = "Planner"
    vm.backAction = function() {
        vm.$router.navigate(['PlannerCalendar'])
    }

    vm.$routerOnActivate = function(next) {
        vm.session = SessionsService.getSessionById(next.params.id)
        vm.place = PlacesService.getPlaceById(vm.session.placeId)
        vm.titleName = vm.session.name
        vm.conferences = SessionsService.getConferencesBySession(vm.session)
    }

    vm.goToConference = function(conference) {
        vm.$router.navigate(['PlannerConference', {
            id: conference.$id
        }])
    }
}
