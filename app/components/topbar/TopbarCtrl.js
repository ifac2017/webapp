angular.module('webapp').controller('TopbarCtrl', TopbarCtrl)
TopbarCtrl.$inject = ['CurrentUser', '$rootRouter', '$mdSidenav']

/**
 * @ngdoc controller
 * @name webapp.controller:TopbarCtrl
 * @requires $rootRouter
 * @description In charge of the topbar view.
 */
function TopbarCtrl(CurrentUser, $rootRouter, $mdSidenav) {
    var vm = this

    /**
     * @ngdoc property
     * @name currentUser
     * @propertyOf webapp.controller:SidebarCtrl
     * @description Current logged user
     */
    vm.currentUser = CurrentUser

    /**
     * @ngdoc method
     * @name openProfile
     * @methodOf webapp.controller:TopbarCtrl
     * @description Redirect to the profile page.
     * @example
      ```javascript
      topbarCtrl.openProfile()
      ```
     */
    vm.openProfile = function() {
        $rootRouter.navigate(['Profile'])
    }

    vm.toggleSideMenu = function() {
        $mdSidenav('left').toggle()
    }

}
