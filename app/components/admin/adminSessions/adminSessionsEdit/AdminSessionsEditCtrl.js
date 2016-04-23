angular.module('webapp').controller('AdminSessionsEditCtrl', AdminSessionsEditCtrl)
AdminSessionsEditCtrl.$inject = ['SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsEditCtrl
 * @description In charge of the admin sessions edition view.
 */
function AdminSessionsEditCtrl(SessionsService) {
    var vm = this

    vm.titleName = "Edit session"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
        vm.$router.navigate(['AdminSessionsDashboard'])
    }

    vm.$routerOnActivate = function(next) {
        vm.session = SessionsService.getSessionById(next.params.id)
        vm.date = new Date(vm.session.date)
        vm.start_time = new Date(vm.session.start_time)
        vm.end_time = new Date(vm.session.end_time)
    }

    vm.editSession = function() {
        vm.session.date = vm.date.getTime()
        vm.session.start_time = vm.start_time.getTime()
        vm.session.end_time = vm.end_time.getTime()
        SessionsService.saveSession(vm.session)
            .then(function() {
                vm.$router.navigate(['AdminSessionsDashboardData', {
                    data: "editionOkay"
                }])
            })
            .catch(function() {})
    }
}
