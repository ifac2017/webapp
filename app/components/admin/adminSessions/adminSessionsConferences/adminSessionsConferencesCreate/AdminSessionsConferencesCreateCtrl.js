angular.module('webapp').controller('AdminSessionsConferencesCreateCtrl', AdminSessionsConferencesCreateCtrl)
AdminSessionsConferencesCreateCtrl.$inject = []

/**
 * @ngdoc controller
 * @name webapp.controller:AdminSessionsConferencesCreateCtrl
 * @description In charge of the admin sessions conferences creation view.
 */
function AdminSessionsConferencesCreateCtrl() {
    var vm = this

    vm.titleName = "Add new conference"
    vm.backName = "Sessions Dashboard"
    vm.backAction = function() {
      vm.$router.parent.navigate(['AdminSessionsDashboard'])
    }

    vm.conference = {
      start_time: null,
      end_time: null,
      place: null,
      room: null,
      speakers: [],
      session: null,
      abstract: null,
      name: null,
    }

    vm.$routerOnActivate = function(next, prev) {
      console.log("routerOnActivate")
      console.log(next)
    }
}
