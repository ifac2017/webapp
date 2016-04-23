angular.module('webapp').controller('AdminSessionsDashboardCtrl', AdminSessionsDashboardCtrl)
AdminSessionsDashboardCtrl.$inject = ['NotificationsService', 'SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsCreateCtrl
 * @description In charge of the admin sessions dashboard view.
 */
function AdminSessionsDashboardCtrl(NotificationsService, SessionsService) {
    var vm = this

    vm.titleName = "Sessions Dashboard"
    vm.backName = "Admin Dashboard"
    vm.backAction = function() {
      vm.$router.parent.navigate(['AdminDashboard'])
    }

    vm.sessions = SessionsService.sessions

    vm.goToSessionsCreate = function() {
      vm.$router.navigate(['AdminSessionsCreate'])
    }

    vm.$routerOnActivate = function(next) {
        if (next.params.data === "creationOkay") {
            NotificationsService.success('The session has been well created!')
        } else if (next.params.data === "editionOkay") {
            NotificationsService.success('The session has been well edited!')
        }
    }
}
