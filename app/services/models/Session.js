angular.module('webapp').factory('Session', Session)
Session.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Session
 * @description Represents a session
 *  A session is characterized by
 *  - a name: `String`
 *  - a date: `int`
 *  - a start_time: `int`
 *  - an end_time: `int`
 *  - one or more conferences: `Array<Conference>`
 *  - a place id: `String`
 *  - a room: `String`
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
