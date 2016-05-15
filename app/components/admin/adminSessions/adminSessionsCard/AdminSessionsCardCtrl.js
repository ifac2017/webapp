angular.module('webapp').controller('AdminSessionsCardCtrl', AdminSessionsCardCtrl)
AdminSessionsCardCtrl.$inject = ['SessionsService', 'ConferencesService', '$mdDialog']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsCardCtrl
 * @description In charge of the admin sessions card view.
 */
function AdminSessionsCardCtrl(SessionsService, ConferencesService, $mdDialog) {
    var vm = this

    vm.removeSession = function(event) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this session?')
            .ariaLabel('Remove session')
            .targetEvent(event)
            .ok('Yes remove!')
            .cancel('Cancel')
        $mdDialog.show(confirm).then(function() {
            SessionsService.removeSession(vm.session)
        })
    }

    vm.removeConference = function(conference, event) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this conference?')
            .ariaLabel('Remove conference')
            .targetEvent(event)
            .ok('Yes remove!')
            .cancel('Cancel')
        $mdDialog.show(confirm).then(function() {
            ConferencesService.removeConference(conference, vm.session)
            vm.conferences.splice(vm.conferences.indexOf(conference), 1)
        })
    }

    vm.showConferences = false

    vm.toggleConferences = function() {
        if (!vm.conferences) {
            vm.getConferences()
        }
        vm.showConferences = !vm.showConferences

    }

    vm.getConferences = function() {
        vm.conferences = SessionsService.getConferencesBySession(vm.session)
    }

}
