angular.module('webapp').controller('PlannerCtrl', PlannerCtrl)
PlannerCtrl.$inject = ['SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerCtrl
 * @description In charge of the planner view.
 */
function PlannerCtrl(SessionsService) {
    var vm = this

    vm.titleName = "Planner"

    vm.sessions = SessionsService.sessions
}
