angular.module('webapp').factory('EventService', EventService)
EventService.$inject = ['$firebaseObject', 'Event']

/**
 * @ngdoc service
 * @name webapp.service:PlacesService
 * @description In charge of places management.
 */
function EventService($firebaseObject, Event) {
    var EventService = {}

    EventService._ref = new Firebase("https://ifac2017.firebaseio.com/event")

    EventService.event = $firebaseObject(EventService._ref)

    EventService.Model = Event

    EventService.loadEvent = function() {
        return EventService.event.$loaded()
    }

    EventService.save = function(event) {
      EventService.event.start_date = event.start_date.getTime()
      EventService.event.end_date = event.end_date.getTime()
      return EventService.event.$save()
    }

    return EventService
}
