angular.module('webapp').component('waSessionListConferenceCard', {
  controller: 'SessionListConferenceCardCtrl',
  templateUrl: ['$element', function($element) {
      angular.element($element).addClass('layout-column')
      return 'sessionListConferenceCard.html'
  }],
  bindings: {
      conference: '<',
      conferenceClicked: '&'
  }
})
