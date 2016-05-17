angular.module('webapp').controller('AdminSessionsDashboardCtrl', AdminSessionsDashboardCtrl)
AdminSessionsDashboardCtrl.$inject = ['NotificationsService', 'SessionsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsDashboardCtrl
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

    vm.order = "name"

    vm.sessions = SessionsService.sessions

    vm.editSession = function(session) {
        vm.$router.navigate(['AdminSessionsEdit', {
            id: session.$id
        }])
    }

    vm.addConference = function(session) {
        vm.$router.navigate(['AdminSessionsConferences', {
            id: session.$id
        }])
    }

    vm.editConference = function(session, conference) {
        vm.$router.navigate(['AdminSessionsConferences', {
            id: session.$id
        }, 'AdminSessionsConferencesEdit', {
            id: conference.$id
        }])
    }

    vm.$routerOnActivate = function(next) {
        if (next.params.data === "creationSessionOkay") {
            NotificationsService.success('The session has been well created!')
        } else if (next.params.data === "creationConferenceOkay") {
            NotificationsService.success('The conference has been well created!')
        }
    }
}
