// app/controllers/LoginCtrl.js

/**
  * Login controller of the app
**/

angular.module('webapp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl(AuthService, NotificationsService, $location) {
  var vm = this;

  vm.user = {
    email: "",
    password: ""
  }

  vm.login = function() {
    AuthService.login(vm.user.email, vm.user.password, function(error) {
      if (error) {
        NotificationsService.error("Error during logging. Please verify your password.");
      } else {
        $location.path('/')
      }
    })
  }

  vm.signup = function() {
    AuthService.signup(vm.user.email, vm.user.password, function(error) {
      if (error) {
        NotificationsService.error("Error during signing up. Please try again.");
      } else {
        vm.login(vm.user.email, vm.user.password)
      }
    })
  }
}
