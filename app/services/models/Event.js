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
        end_date: null
    }

    Event.reset = function() {
      Place.start_date = null
      Place.end_date = null
    }

    return Event
}
