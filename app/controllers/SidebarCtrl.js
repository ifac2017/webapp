// app/controllers/SidebarCtrl.js

/**
 * Sidebar controller: in charge of the sidebar responsivness
 **/

angular.module('webapp').controller('SidebarCtrl', SidebarCtrl);

function SidebarCtrl(AuthService, $location, $scope) {
    var vm = this;
    vm.isLogged = AuthService.isConnected

    vm.login = function() {
        $location.path('/login')
    }

    vm.logout = function() {
        AuthService.logout()
        $location.path('/')
    }

    vm.openAdmin = function() {
        $location.path('/admin')
    }

    $scope.$on('onAuth', function(event, args) {
        vm.isLogged = AuthService.isConnected
    })
}
