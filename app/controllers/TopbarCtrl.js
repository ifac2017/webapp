// app/controllers/TopbarCtrl.js

/**
  * Sidebar controller: in charge of the sidebar responsivness
**/

angular.module('webapp').controller('TopbarCtrl', TopbarCtrl);

function TopbarCtrl($location) {
  var vm = this;

  vm.openProfile = function() {
    $location.path('/profile')
  }

  vm.goHome = function() {
    $location.path('/')
  }
}
