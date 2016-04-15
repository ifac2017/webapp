angular.module('webapp').controller('SidebarCtrl', SidebarCtrl)

/**
 * @ngdoc controller
 * @name webapp.controller:SidebarCtrl
 * @description In charge of the sidebar view.
 */
function SidebarCtrl(AuthService, $location, $scope) {
    var vm = this
        /**
         * @ngdoc property
         * @name isLogged
         * @propertyOf webapp.controller:SidebarCtrl
         * @description True if the user is logged False otherwise.
         */
    vm.isLogged = AuthService.isConnected

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
        /**
         * @ngdoc method
         * @name $on
         * @methodOf webapp.controller:SidebarCtrl
         * @description Listen for the onAuth event sent by the AuthService in order to update the isLogged property.
         */
    $scope.$on('onAuth', function(event, args) {
        vm.isLogged = AuthService.isConnected
    })
}
