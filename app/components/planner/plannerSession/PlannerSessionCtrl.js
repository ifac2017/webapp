angular.module('webapp').controller('PlannerSessionCtrl', PlannerSessionCtrl)
PlannerSessionCtrl.$inject = ['SessionsService', 'ConferencesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerSessionCtrl
 * @description In charge of the planner session view.
 */
function PlannerSessionCtrl(SessionsService, ConferencesService) {
    var vm = this

    vm.backName = "Planner"
    vm.backAction = function() {
        vm.$router.navigate(['PlannerCalendar'])
    }

    //vm.conferences = []

    vm.$routerOnActivate = function(next) {
        vm.session = SessionsService.getSessionById(next.params.id)
        vm.titleName = vm.session.name
        SessionsService.getConferencesBySession(vm.session).then(function(conferences) {
            vm.conferences = conferences
        }).catch(function(error){
          console.log(error)
          vm.conferences = []
        })
    }

    vm.goToConference = function(conference) {
        vm.$router.navigate(['PlannerConference', {
            id: conference.$id
        }])
    }
}
