angular.module('webapp').factory('Session', Session)
Session.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Session
 * @description Represents a session
 */
function Session() {
    return {
        name: null,
        date: null,
        start_time: null,
        end_time: null,
        conferences: []
    }
}
