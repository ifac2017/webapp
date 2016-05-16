angular.module('webapp').factory('Event', Event)
Event.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Event
 * @description Represents an event
 *  An event is characterized by
 *  - a name: `String`
 *  - a start_date: `int`
 *  - an end_date: `int`
 *  - an image: `base64DataUrl`
 *  - one or more timeslots: `Array<Timeslot>`
 */
function Event() {
    var Event = {
        name: null,
        start_date: null,
        end_date: null,
        image: null,
        timeslots: []
    }

    Event.reset = function() {
      Event.name = null
      Event.start_date = null
      Event.end_date = null
      Event.image = null
      Event.timeslots = []
    }

    return Event
}
