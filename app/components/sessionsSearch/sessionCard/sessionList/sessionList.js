angular.module('webapp').component('waSessionList', {
  controller: 'SessionListCtrl',
  templateUrl: ['$element', function($element) {
      angular.element($element).addClass('layout-column')
      return 'sessionList.html'
  }],
  bindings: {
      conferences: '<',
  }
})
