angular.module('webapp').factory('SessionsService', SessionsService)
SessionsService.$inject = ['SessionsConferencesService', 'Session', '$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:SessionsService
 * @description In charge of sessions management.
 */
function SessionsService(SessionsConferencesService, Session, $firebaseArray) {
    var SessionsService = {}

    /**
     * @ngdoc property
     * @name sessions
     * @propertyOf webapp.service:SessionsService
     * @description Sessions list
     */
    SessionsService.sessions = SessionsConferencesService.sessions

    /**
     * @ngdoc property
     * @name Model
     * @propertyOf webapp.service:SessionsService
     * @description Session model
     */
    SessionsService.Model = Session

    /**
     * @ngdoc method
     * @name addSession
     * @methodOf webapp.service:SessionsService
     * @description Add a session to firebase
     * @param {Session} session - The new session
     * @returns {Promise} ok if the session was well added
     * @example
      ```javascript
      SessionsService.addConference(session)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsService.addSession = function(session) {
        return SessionsService.sessions.$add({
            name: session.name,
            date: session.date.getTime(),
            start_time: session.start_time.getTime(),
            end_time: session.end_time.getTime(),
            placeId: session.placeId,
            room: session.room
        })
    }

    /**
     * @ngdoc method
     * @name removeSession
     * @methodOf webapp.service:SessionsService
     * @description Remove a session from firebase
     * @param {Session} session - The session to be removed
     * @example
      ```javascript
      SessionsService.removeSession(session)
      ```
      */
    SessionsService.removeSession = function(session) {
        SessionsConferencesService.removeSession(session)
    }

    /**
     * @ngdoc method
     * @name loadArray
     * @methodOf webapp.service:SessionsService
     * @description Return a promise indicating if the sessions list is loaded
     * @returns {Promise} ok if the sessions list is loaded
     * @example
      ```javascript
      SessionsService.loadArray()
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsService.loadArray = function() {
        return SessionsService.sessions.$loaded()
    }

    /**
     * @ngdoc method
     * @name getSessionById
     * @methodOf webapp.service:SessionsService
     * @description Return a promise with the session
     * @param {ID} id - The session id
     * @returns {Promise} the session found if it exists
     * @example
      ```javascript
      SessionsService.getSessionById(id)
      .then(function(session) {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsService.getSessionById = function(id) {
        return SessionsService.sessions.$getRecord(id)
    }

    /**
     * @ngdoc method
     * @name saveSession
     * @methodOf webapp.service:SessionsService
     * @description Return a promise indicating if the session was saved
     * @param {Session} session - The session to be saved
     * @returns {Promise} ok if the conference was saved
     * @example
      ```javascript
      SessionsService.saveSession(session)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsService.saveSession = function(session) {
        return SessionsConferencesService.saveSession(session)
    }

    /**
     * @ngdoc method
     * @name addConferenceTo
     * @methodOf webapp.service:SessionsService
     * @description Return a promise indicating if the session was saved after adding the conference
     * @param {ID} conference - The conference id to be added
     * @param {Session} session - The session
     * @returns {Promise} ok if the conference was saved after adding the conference
     * @example
      ```javascript
      SessionsService.addConferenceTo(session, conference)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsService.addConferenceTo = function(session, conference) {
        if (!session.conferences) {
            session.conferences = []
        }
        session.conferences.push(conference)
        return SessionsService.saveSession(session)
    }

    /**
     * @ngdoc method
     * @name getSessionsByDate
     * @methodOf webapp.service:SessionsService
     * @description Return a promise with the session
     * @param {Date} date - The session date
     * @returns {Promise} ok if a conference was found on this date
     * @example
      ```javascript
      SessionsService.getSessionsByDate(date)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsService.getSessionsByDate = function(date) {
        return $firebaseArray(SessionsService.sessions.$ref().orderByChild("date").equalTo(date.valueOf())).$loaded()
    }

      /**
       * @ngdoc method
       * @name getConferencesBySession
       * @methodOf webapp.service:SessionsService
       * @description Return the conferences list corresponding to a session
       * @param {Session} session - The session of the conference
       * @returns {Array} the conferences list found if it exists
       * @example
        ```javascript
        SessionsService.getConferencesBySession(session)
        ```
        */
    SessionsService.getConferencesBySession = function(session) {
        return SessionsConferencesService.getConferencesBySession(session)
    }

    return SessionsService
}
