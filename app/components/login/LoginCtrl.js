angular.module('webapp').controller('LoginCtrl', LoginCtrl)
LoginCtrl.$inject = ['AuthService', 'NotificationsService']

/**
 * @ngdoc controller
 * @name webapp.controller:LoginCtrl
 * @requires AuthService
 * @requires NotificationsService
 * @description In charge of the login view.
 */

function LoginCtrl(AuthService, NotificationsService) {
    var vm = this

    vm.titleName = "Login"

    /**
     * @ngdoc property
     * @name user
     * @propertyOf webapp.controller:LoginCtrl
     * @description The user model for the login form
     */
    vm.user = {
        email: "",
        password: ""
    }

    /**
     * @ngdoc method
     * @name login
     * @methodOf webapp.controller:LoginCtrl
     * @description Send the login request with the corresponding data to the AuthService.
     * @example
      ```javascript
      loginCtrl.login()
      ```
     */
    vm.login = function() {
        AuthService.login(vm.user.email, vm.user.password)
            .then(function() {
                vm.$router.navigate(['Planner'])
            })
            .catch(function(error) {
                NotificationsService.error("Error during logging. Please verify your password.")
            })
    }

    /**
     * @ngdoc method
     * @name signup
     * @methodOf webapp.controller:LoginCtrl
     * @description Send the signup request with the corresponding data to the AuthService.
     * @example
      ```javascript
      loginCtrl.signup()
      ```
     */
    vm.signup = function() {
        AuthService.signup(vm.user.email, vm.user.password)
            .then(function() {
                vm.login(vm.user.email, vm.user.password)
            })
            .catch(function(error) {
                NotificationsService.error("Error during signing up. Please try again.")
            })
    }
}
