// app/controllers/SidebarCtrl.js

/**
  * Sidebar controller: in charge of the sidebar responsivness
**/

angular.module('webapp').controller('SidebarCtrl', SidebarCtrl);

function SidebarCtrl(CurrentUser, AuthService, $location, $scope) {
  var vm = this;
  vm.isLogged = CurrentUser.exist

  vm.login = function() {
    $location.path('/login')
  }

  vm.logout = function() {
    AuthService.logout()
    $location.path('/')
  }

  $scope.$on('onAuth', function (event, args) {
    vm.isLogged = CurrentUser.exist
  })
}
