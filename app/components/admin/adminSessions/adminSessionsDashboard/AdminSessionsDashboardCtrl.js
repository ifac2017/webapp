angular.module('webapp').controller('AdminSessionsDashboardCtrl', AdminSessionsDashboardCtrl)
AdminSessionsDashboardCtrl.$inject = ['NotificationsService', 'SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsCreateCtrl
 * @description In charge of the admin sessions dashboard view.
 */
function AdminSessionsDashboardCtrl(NotificationsService, SessionsService) {
    var vm = this

    // breadcrump
    vm.titleName = "Sessions Dashboard"
    vm.backName = "Admin Dashboard"
    vm.textAction = "Add a new session"
    vm.iconAction = "add"
    vm.action = function() {
        vm.$router.navigate(['AdminSessionsCreate'])
    }
    vm.backAction = function() {
      vm.$router.parent.navigate(['AdminDashboard'])
    }
    // end breadcrump

    vm.sessions = SessionsService.sessions

    vm.editSession = function(session) {
      vm.$router.navigate(['AdminSessionsEdit', {
          id: session.$id
      }])
    }

    vm.addConference = function(session) {
      vm.$router.navigate(['AdminSessionsConferencesCreate', {
          id: session.$id
      }])
    }

    vm.$routerOnActivate = function(next) {
        if (next.params.data === "creationOkay") {
            NotificationsService.success('The session has been well created!')
        } else if (next.params.data === "editionOkay") {
            NotificationsService.success('The session has been well edited!')
        }
    }
}