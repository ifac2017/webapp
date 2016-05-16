angular.module('webapp').factory('Conference', Conference)
Conference.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Conference
 * @description Represents a conference
 *  A conference is characterized by
 *  - a name: `String`
 *  - a start_time: `int`
 *  - an end_time: `int`
 *  - one or more speakers: `Array<Speaker>`
 *  - a session id: `String`
 *  - a facultative abstract: `String`
 */
function Conference() {
    var Conference = {
        name: null,
        start_time: null,
        end_time: null,
        speakers: [],
        sessionId: null,
        abstract: null
    }

    Conference.reset = function() {
      Conference.name = null
      Conference.start_time = null
      Conference.end_time = null
      Conference.speakers = []
      Conference.sessionId = null
      Conference.abstract = null
    }

    return Conference
}
