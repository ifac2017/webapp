angular.module('webapp').controller('PlannerSessionCtrl', PlannerSessionCtrl)
PlannerSessionCtrl.$inject = ['ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerSessionCtrl
 * @description In charge of the planner session view.
 */
function PlannerSessionCtrl(ConferencesService) {
    var vm = this

    vm.titleName = vm.session.name

    vm.conferences = []

    if (vm.session.conferences) {
        for (var i = 0; i < vm.session.conferences.length; i++) {
            vm.conferences.push(ConferencesService.getConferenceById(vm.session.conferences[i]))
        }
    }
}
