angular.module('webapp').factory('Conference', Conference)
Conference.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Conference
 * @description Represents a conference
 */
function Conference() {
    return {
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
}
