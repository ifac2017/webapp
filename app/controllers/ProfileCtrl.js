// app/controllers/ProfileCtrl.js

/**
  * Profile controller: ahndle profile updates on the go
**/

angular.module('webapp').controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl(AuthService, $scope, $rootScope) {
  var vm = this;

  if (AuthService.isConnected) {
    AuthService.currentUser.$bindTo($scope, "profile")
  }

  $rootScope.$on('onAuth', function (event, args) {
    AuthService.currentUser.$bindTo($scope, "profile")
  })

}
