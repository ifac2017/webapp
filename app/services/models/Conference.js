angular.module('webapp').factory('Conference', Conference)
Conference.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Conference
 * @description Represents a conference
 */
function Conference() {
    var Conference = {
        name: null,
        date: null,
        start_time: null,
        end_time: null,
        placeId: null,
        room: null,
        speakers: [],
        sessionId: null,
        abstract: null
    }

    Conference.reset = function() {
      Conference.name = null
      Conference.date = null
      Conference.start_time = null
      Conference.end_time = null
      Conference.placeId = null
      Conference.room = null
      Conference.speakers = []
      Conference.sessionId = null
      Conference.abstract = null
    }

    return Conference
}
