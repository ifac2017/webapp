angular.module('webapp').controller('PlannerConferenceCtrl', PlannerConferenceCtrl)
PlannerConferenceCtrl.$inject = ['ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerConferenceCtrl
 * @description In charge of the planner conference view.
 */
function PlannerConferenceCtrl(ConferencesService) {
    var vm = this

    vm.backName = "Session"

    vm.$routerOnActivate = function(next) {
        vm.conference = ConferencesService.getConferenceById(next.params.id)
        vm.titleName = vm.conference.name
        vm.backAction = function() {
            vm.$router.navigate(['PlannerSession', {
              id: vm.conference.sessionId
            }])
        }
    }
}
