angular.module('webapp').controller('CalendarSessionCardCtrl', CalendarSessionCardCtrl)
CalendarSessionCardCtrl.$inject = ['PlacesService']

/**
 * @ngdoc controller
 * @name webapp.controller:CalendarSessionCardCtrl
 * @description In charge of the calendar session card view.
 */
function CalendarSessionCardCtrl(PlacesService) {
  var vm = this;

  vm.place = PlacesService.getPlaceById(vm.session.placeId)
}
