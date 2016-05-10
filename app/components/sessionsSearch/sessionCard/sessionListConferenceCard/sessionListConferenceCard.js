/**
 * @ngdoc directive
 * @name webapp.directive:wa-session-list-conference-card
 * @restrict E
 * @description Element of the list of all the conference of the session.
 */
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
