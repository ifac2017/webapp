angular.module('webapp').controller('TopbarCtrl', TopbarCtrl)
TopbarCtrl.$inject = ['$location']

/**
 * @ngdoc controller
 * @name webapp.controller:TopbarCtrl
 * @requires $location
 * @description In charge of the topbar view.
 */
function TopbarCtrl($location) {
    var vm = this

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
        $location.path('/profile')
    }

    /**
     * @ngdoc method
     * @name goHome
     * @methodOf webapp.controller:TopbarCtrl
     * @description Redirect to the home page.
     * @example
      ```javascript
      topbarCtrl.goHome()
      ```
     */
    vm.goHome = function() {
        $location.path('/')
    }
}
