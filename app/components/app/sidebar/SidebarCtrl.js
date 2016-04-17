angular.module('webapp').controller('SidebarCtrl', SidebarCtrl)
SidebarCtrl.$inject = ['AuthService', '$location']
/**
 * @ngdoc controller
 * @name webapp.controller:SidebarCtrl
 * @description In charge of the sidebar view.
 */
function SidebarCtrl(AuthService, $location) {
    var vm = this

    /**
     * @ngdoc property
     * @name currentUser
     * @propertyOf webapp.controller:SidebarCtrl
     * @description Current logged user
     */
    vm.currentUser = AuthService.getCurrentUser()

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
        $location.path('/login')
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
        $location.path('/')
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
        $location.path('/admin')
    }
}
