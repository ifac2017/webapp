angular.module('webapp').controller('PlannerConferenceCtrl', PlannerConferenceCtrl)
PlannerConferenceCtrl.$inject = ['ConferencesService', 'NotificationsService', 'CurrentUser', 'SessionsService', 'PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:PlannerConferenceCtrl
 * @description In charge of the planner conference view.
 */
function PlannerConferenceCtrl(ConferencesService, NotificationsService, CurrentUser, SessionsService, PlacesService) {
    var vm = this

    vm.textAction = "Save this conference"
    vm.iconAction = "save"
    vm.action = function() {
        CurrentUser.saveConference(vm.conference).then(function() {
            NotificationsService.success("Conference saved!")
        }).catch(function() {
            NotificationsService.error("You must be logged to save a conference.")
        })
    }


    vm.$routerOnActivate = function(next) {
        vm.conference = ConferencesService.getConferenceById(next.params.id)
        vm.session = SessionsService.getSessionById(vm.conference.sessionId)
        vm.date = new Date(vm.conference.date)
        vm.start_time = new Date(vm.conference.start_time)
        vm.end_time = new Date(vm.conference.end_time)
        vm.titleName = vm.conference.name
        if (next.params.data === "backDiscover") {
            vm.backName = "Discover"
            vm.backAction = function() {
                vm.$router.parent.navigate(['SessionSearch'])
            }
        } else if (next.params.data === "backProfile") {
            vm.backName = "Profile"
            vm.backAction = function() {
                vm.$router.parent.navigate(['Profile'])
            }
        } else {
            vm.backName = "Session"
            vm.backAction = function() {
                vm.$router.navigate(['PlannerSession', {
                    id: vm.conference.sessionId,
                    back: next.params.back
                }])
            }
        }
        vm.place = PlacesService.getPlaceById(vm.session.placeId)
    }
}
