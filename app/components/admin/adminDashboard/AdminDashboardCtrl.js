angular.module('webapp').controller('AdminDashboardCtrl', AdminDashboardCtrl)
AdminDashboardCtrl.$inject = ['EventService', 'NotificationsService']

/**
 * @ngdoc controller
 * @name webapp.controller:AdminDashboardCtrl
 * @description In charge of the admin dashboard view.
 */
function AdminDashboardCtrl(EventService, NotificationsService) {
    var vm = this

    vm.titleName = "Admin Dashboard"

    vm.event = EventService.Model

    vm.$routerOnActivate = function(next, prev) {
      vm.event.start_date = new Date(EventService.event.start_date)
      vm.event.end_date = new Date(EventService.event.end_date)
    }

    vm.saveEvent = function() {
      EventService.save(vm.event).then(function(){
        NotificationsService.success('The event has been well updated!')
      }).catch(function(error){
        NotificationsService.error('An error occurred... Please try again.')
      })
    }

    vm.goToSessions = function() {
      vm.$router.navigate(['AdminSessions'])
    }

    vm.goToPlaces = function() {
      vm.$router.navigate(['AdminPlaces'])
    }
}
