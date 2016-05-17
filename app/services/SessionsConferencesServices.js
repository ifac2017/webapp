angular.module('webapp').factory('SessionsConferencesService', SessionsConferencesService)
SessionsConferencesService.$inject = ['CurrentUser', '$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:SessionsConferencesService
 * @description In charge of sessions and conferences management.
 */
function SessionsConferencesService(CurrentUser, $firebaseArray) {
    var SessionsConferencesService = {}

    /**
     * @ngdoc property
     * @name _refSessions
     * @propertyOf webapp.service:SessionsConferencesService
     * @description Reference to the Firebase sessions database
     */
    SessionsConferencesService._refSessions = new Firebase("https://ifac2017.firebaseio.com/sessions")

    /**
     * @ngdoc property
     * @name _refConferences
     * @propertyOf webapp.service:SessionsConferencesService
     * @description Reference to the Firebase conferences database
     */
    SessionsConferencesService._refConferences = new Firebase("https://ifac2017.firebaseio.com/conferences")

    /**
     * @ngdoc property
     * @name sessions
     * @propertyOf webapp.service:SessionsConferencesService
     * @description Sessions list
     */
    SessionsConferencesService.sessions = $firebaseArray(SessionsConferencesService._refSessions)

    /**
     * @ngdoc property
     * @name conferences
     * @propertyOf webapp.service:SessionsConferencesService
     * @description Conferences list
     */
    SessionsConferencesService.conferences = $firebaseArray(SessionsConferencesService._refConferences)

    /**
     * @ngdoc method
     * @name removeSession
     * @methodOf webapp.service:SessionsConferencesService
     * @description Remove a session from firebase
     * @param {Session} session - The session to be removed
     * @example
      ```javascript
      SessionsConferencesService.removeSession(session)
      ```
      */
    SessionsConferencesService.removeSession = function(session) {
        if (session.conferences && typeof session.conferences !== 'undefined') {
            var cpt = session.conferences.length
            for (var i = 0; i < cpt; i++) {
                SessionsConferencesService.removeConference(SessionsConferencesService.getConferenceById(session.conferences[i]), session)
            }
        }
        SessionsConferencesService.sessions.$remove(session)
    }

    /**
     * @ngdoc method
     * @name removeConference
     * @methodOf webapp.service:SessionsConferencesService
     * @description Remove a conference from firebase
     * @param {Conference} conference - The conference to be removed
     * @param {Session} session - The session of the conference
     * @example
      ```javascript
      SessionsConferencesService.removeConference(conference, session)
      ```
      */
    SessionsConferencesService.removeConference = function(conference, session) {
        CurrentUser.removeConference(conference)
        session.conferences.splice(session.conferences.indexOf(conference.$id), 1)
        SessionsConferencesService.saveSession(session)
        SessionsConferencesService.conferences.$remove(conference)
    }

    /**
     * @ngdoc method
     * @name getConferenceById
     * @methodOf webapp.service:SessionsConferencesService
     * @description Return a promise with the conference
     * @param {ID} id - The conference id
     * @returns {Promise} the conference found if it exists
     * @example
      ```javascript
      SessionsConferencesService.getConferenceById(id)
      .then(function(conference) {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsConferencesService.getConferenceById = function(id) {
        return SessionsConferencesService.conferences.$getRecord(id)
    }

    /**
     * @ngdoc method
     * @name getConferencesBySession
     * @methodOf webapp.service:SessionsConferencesService
     * @description Return the conferences list corresponding to a session
     * @param {Session} session - The session of the conference
     * @returns {Array} the conferences list found if it exists
     * @example
      ```javascript
      SessionsConferencesService.getConferencesBySession(session)
      ```
      */
    SessionsConferencesService.getConferencesBySession = function(session) {
        if (typeof session.conferences !== 'undefined') {
            var conferences = []
            var cpt = session.conferences.length
            for (var i = 0; i < cpt; i++) {
                conferences.push(SessionsConferencesService.getConferenceById(session.conferences[i]))
            }
            return conferences
        } else {
            return [];
        }
    }

    /**
     * @ngdoc method
     * @name saveSession
     * @methodOf webapp.service:SessionsConferencesService
     * @description Return a promise indicating if the session was saved
     * @param {Session} session - The session to be saved
     * @returns {Promise} ok if the conference was saved
     * @example
      ```javascript
      SessionsConferencesService.saveSession(session)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    SessionsConferencesService.saveSession = function(session) {
        return SessionsConferencesService.sessions.$save(session)
    }

    return SessionsConferencesService
}
