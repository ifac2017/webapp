angular.module('webapp').controller('PlannerSessionCtrl', PlannerSessionCtrl)
PlannerSessionCtrl.$inject = ['SessionsService', 'ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerSessionCtrl
 * @description In charge of the planner session view.
 */
function PlannerSessionCtrl(SessionsService, ConferencesService) {
    var vm = this

    //vm.titleName = vm.session.name

    vm.backName = "Planner"
    vm.backAction = function() {
        vm.$router.navigate(['PlannerCalendar'])
    }

    vm.conferences = []

    vm.$routerOnActivate = function(next) {
        vm.session = SessionsService.getSessionById(next.params.id)
        vm.titleName = vm.session.name
        if (vm.session.conferences) {
            for (var i = 0; i < vm.session.conferences.length; i++) {
                vm.conferences.push(ConferencesService.getConferenceById(vm.session.conferences[i]))
            }
        }
    }
}
