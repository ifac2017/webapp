angular.module('webapp').controller('AdminSessionsCardCtrl', AdminSessionsCardCtrl)
AdminSessionsCardCtrl.$inject = ['SessionsService', '$mdDialog', '$rootRouter']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsCardCtrl
 * @description In charge of the admin sessions card view.
 */
function AdminSessionsCardCtrl(SessionsService, $mdDialog, $rootRouter) {
    var vm = this

    vm.start_date = new Date(vm.session.start_datetime)
    vm.end_date = new Date(vm.session.end_datetime)
    
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

    vm.editSession = function() {
        $rootRouter.navigate(['Admin', 'AdminSessions', 'AdminSessionsEdit', {
            id: vm.place.$id
        }])
    }
}
