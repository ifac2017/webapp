angular.module('webapp').factory('Session', Session)
Session.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Session
 * @description Represents a session
 */
function Session() {
    var Session = {
        name: null,
        date: null,
        start_time: null,
        end_time: null,
        placeId: null,
        room: null,
        conferences: []
    }

    Session.reset = function() {
      Session.name = null
      Session.date = null
      Session.start_time = null
      Session.end_time = null
      Session.placeId = null
      Session.room = null
      Session.conferences = []
    }

    return Session
}
