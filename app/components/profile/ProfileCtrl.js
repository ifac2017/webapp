angular.module('webapp').controller('ProfileCtrl', ProfileCtrl)
ProfileCtrl.$inject = ['AuthService']

/**
 * @ngdoc controller
 * @name webapp.controller:ProfileCtrl
 * @description In charge of the profile view.
 */
function ProfileCtrl(AuthService) {
    var vm = this

    /**
     * @ngdoc property
     * @name currentUser
     * @propertyOf webapp.controller:SidebarCtrl
     * @description Current logged user
     */
    vm.currentUser = AuthService.getCurrentUser()
}
