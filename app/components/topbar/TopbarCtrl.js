angular.module('webapp').controller('TopbarCtrl', TopbarCtrl)
TopbarCtrl.$inject = ['$rootRouter']

/**
 * @ngdoc controller
 * @name webapp.controller:TopbarCtrl
 * @requires $rootRouter
 * @description In charge of the topbar view.
 */
function TopbarCtrl($rootRouter) {
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
        $rootRouter.navigate(['Profile'])
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
        $rootRouter.navigate(['Planner'])
    }
}
