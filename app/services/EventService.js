angular.module('webapp').factory('EventService', EventService)
EventService.$inject = ['$firebaseObject', 'Event']

/**
 * @ngdoc service
 * @name webapp.service:EventService
 * @description In charge of event management.
 */
function EventService($firebaseObject, Event) {
    var EventService = {}

    /**
     * @ngdoc property
     * @name _ref
     * @propertyOf webapp.service:EventService
     * @description Reference to the Firebase event database
     */
    EventService._ref = new Firebase("https://ifac2017.firebaseio.com/event")

    /**
     * @ngdoc property
     * @name event
     * @propertyOf webapp.service:EventService
     * @description The current event
     */
    EventService.event = $firebaseObject(EventService._ref)

    /**
     * @ngdoc property
     * @name Model
     * @propertyOf webapp.service:EventService
     * @description Event model
     */
    EventService.Model = Event

    /**
     * @ngdoc method
     * @name loadEvent
     * @methodOf webapp.service:EventService
     * @description Return a promise indicating if the event is loaded
     * @returns {Promise} ok if the event is loaded
     * @example
      ```javascript
      EventService.loadEvent()
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    EventService.loadEvent = function() {
        return EventService.event.$loaded()
    }

    /**
     * @ngdoc method
     * @name save
     * @methodOf webapp.service:EventService
     * @description Return a promise indicating if the event was saved
     * @returns {Promise} ok if the event was saved
     * @example
      ```javascript
      EventService.save(event)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    EventService.save = function(event) {
        EventService.event.name = event.name
        EventService.event.image = event.image
        EventService.event.start_date = event.start_date.getTime()
        EventService.event.end_date = event.end_date.getTime()
        EventService.event.timeslots = event.timeslots.map(function(item) {
            return {
                start_time: item.start_time.getTime(),
                end_time: item.end_time.getTime()
            }
        })

        return EventService.event.$save()
    }

    return EventService
}
