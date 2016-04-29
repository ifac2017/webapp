angular.module('webapp').controller('PlannerConferenceCtrl', PlannerConferenceCtrl)
PlannerConferenceCtrl.$inject = ['ConferencesService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerConferenceCtrl
 * @description In charge of the planner conference view.
 */
function PlannerConferenceCtrl(ConferencesService, PlacesService) {
    var vm = this

    vm.backName = "Session"
    vm.place = null

    vm.$routerOnActivate = function(next) {
        vm.conference = ConferencesService.getConferenceById(next.params.id)
        vm.date = new Date(vm.conference.date)
        vm.start_time = new Date(vm.conference.start_time)
        vm.end_time = new Date(vm.conference.end_time)
        vm.titleName = vm.conference.name
        vm.backAction = function() {
            vm.$router.navigate(['PlannerSession', {
              id: vm.conference.sessionId
            }])
        }
        vm.place = PlacesService.getPlaceById(vm.conference.placeId)
    }
}
