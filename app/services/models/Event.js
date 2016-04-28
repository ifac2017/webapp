angular.module('webapp').factory('Event', Event)
Event.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Event
 * @description Represents an event
 */
function Event() {
    var Event = {
        start_date: null,
        end_date: null,
        timeslots: []
    }

    Event.reset = function() {
      Event.start_date = null
      Event.end_date = null
      Event.timeslots = []
    }

    return Event
}
