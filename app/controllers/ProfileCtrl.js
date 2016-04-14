// app/controllers/ProfileCtrl.js

/**
  * Profile controller: ahndle profile updates on the go
**/

angular.module('webapp').controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl(AuthService, $scope) {
  var vm = this;

  $scope.$on('onAuth', function (event, args) {
    AuthService.currentUser.$bindTo($scope, "profile")
  })

}
