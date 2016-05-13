angular.module('webapp').controller('SidebarCtrl', SidebarCtrl)
SidebarCtrl.$inject = ['AuthService', 'CurrentUser', '$rootRouter', '$mdSidenav']
    /**
     * @ngdoc controller
     * @name webapp.controller:SidebarCtrl
     * @requires AuthService
     * @requires CurrentUser
     * @requires $rootRouter
     * @description In charge of the sidebar view.
     */
function SidebarCtrl(AuthService, CurrentUser, $rootRouter, $mdSidenav) {
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
     * @name login
     * @methodOf webapp.controller:SidebarCtrl
     * @description Redirect to the login page.
     * @example
      ```javascript
      sidebarCtrl.login()
      ```
     */
    vm.login = function() {
        $rootRouter.navigate(['Login'])
        $mdSidenav('left').toggle()
    }

    /**
     * @ngdoc method
     * @name logout
     * @methodOf webapp.controller:SidebarCtrl
     * @description Send the logout request to the AuthService.
     * @example
      ```javascript
      sidebarCtrl.logout()
      ```
     */
    vm.logout = function() {
        AuthService.logout()
        $rootRouter.navigate(['Planner'])
        $mdSidenav('left').toggle()
    }

    /**
     * @ngdoc method
     * @name openAdmin
     * @methodOf webapp.controller:SidebarCtrl
     * @description Redirect to the admin page.
     * @example
      ```javascript
      sidebarCtrl.openAdmin()
      ```
     */
    vm.openAdmin = function() {
        $rootRouter.navigate(['Admin'])
        $mdSidenav('left').toggle()
    }

    /**
     * @ngdoc method
     * @name goDiscover
     * @methodOf webapp.controller:SidebarCtrl
     * @description Redirect to the discover page.
     * @example
      ```javascript
      sidebarCtrl.goDiscover()
      ```
     */
    vm.goDiscover = function() {
        $rootRouter.navigate(['SessionSearch'])
        $mdSidenav('left').toggle()
    }

    /**
     * @ngdoc method
     * @name goProfile
     * @methodOf webapp.controller:SidebarCtrl
     * @description Redirect to the profile page.
     * @example
      ```javascript
      sidebarCtrl.goProfile()
      ```
     */
    vm.goProfile = function() {
        $rootRouter.navigate(['Profile'])
        $mdSidenav('left').toggle()
    }

    /**
     * @ngdoc method
     * @name goHome
     * @methodOf webapp.controller:SidebarCtrl
     * @description Redirect to the home page.
     * @example
      ```javascript
      sidebarCtrl.goHome()
      ```
     */
    vm.goHome = function() {
        $rootRouter.navigate(['Planner'])
        $mdSidenav('left').toggle()
    }
}
