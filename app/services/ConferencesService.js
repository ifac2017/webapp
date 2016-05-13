angular.module('webapp').factory('ConferencesService', ConferencesService)
ConferencesService.$inject = ['CurrentUser', 'SessionsService', 'SessionsConferencesService', 'Conference']

/**
 * @ngdoc service
 * @name webapp.service:ConferencesService
 * @description In charge of conferences management.
 */
function ConferencesService(CurrentUser, SessionsService, SessionsConferencesService, Conference) {
    var ConferencesService = {}

    /**
     * @ngdoc property
     * @name conferences
     * @propertyOf webapp.service:ConferencesService
     * @description Conferences list
     */
    ConferencesService.conferences = SessionsConferencesService.conferences

    /**
     * @ngdoc property
     * @name Model
     * @propertyOf webapp.service:ConferencesService
     * @description Conference model
     */
    ConferencesService.Model = Conference

    /**
     * @ngdoc method
     * @name addConference
     * @methodOf webapp.service:ConferencesService
     * @description Add a conference to firebase
     * @param {Conference} conference - The new conference
     * @param {Session} session - The session of the conference
     * @returns {Promise} ok if the conference was well added
     * @example
      ```javascript
      ConferencesService.addConference(conference, session)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    ConferencesService.addConference = function(conference, session) {
        return ConferencesService.conferences.$add({
            name: conference.name,
            start_time: conference.start_time.getTime(),
            end_time: conference.end_time.getTime(),
            speakers: conference.speakers,
            sessionId: conference.sessionId,
            abstract: conference.abstract
        }).then(function(ref) {
            return SessionsService.addConferenceTo(session, ref.key())
        })
    }

    /**
     * @ngdoc method
     * @name removeConference
     * @methodOf webapp.service:ConferencesService
     * @description Remove a conference from firebase
     * @param {Conference} conference - The conference to be removed
     * @param {Session} session - The session of the conference
     * @example
      ```javascript
      ConferencesService.removeConference(conference, session)
      ```
      */
    ConferencesService.removeConference = function(conference, session) {
        SessionsConferencesService.removeConference(conference, session)
    }

    /**
     * @ngdoc method
     * @name loadArray
     * @methodOf webapp.service:ConferencesService
     * @description Return a promise indicating if the conferences list is loaded
     * @returns {Promise} ok if the conferences list is loaded
     * @example
      ```javascript
      ConferencesService.loadArray()
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    ConferencesService.loadArray = function() {
        return ConferencesService.conferences.$loaded()
    }

    /**
     * @ngdoc method
     * @name getConferenceById
     * @methodOf webapp.service:ConferencesService
     * @description Return a promise with the conference
     * @param {ID} id - The conference id
     * @returns {Promise} the conference found if it exists
     * @example
      ```javascript
      ConferencesService.getConferenceById(id)
      .then(function(conference) {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    ConferencesService.getConferenceById = function(id) {
        return SessionsConferencesService.getConferenceById(id)
    }

    /**
     * @ngdoc method
     * @name saveConference
     * @methodOf webapp.service:ConferencesService
     * @description Return a promise indicating if the conference was saved
     * @param {Conference} conference - The conference to be saved
     * @returns {Promise} ok if the conference was saved
     * @example
      ```javascript
      ConferencesService.saveConference(conference)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    ConferencesService.saveConference = function(conference) {
        return ConferencesService.conferences.$save(conference)
    }

    /**
     * @ngdoc method
     * @name getConferencesOfCurrentUser
     * @methodOf webapp.service:ConferencesService
     * @description Return the user's conferences
     * @returns {Array} the user's conferences
     * @example
      ```javascript
      ConferencesService.getConferencesOfCurrentUser()
      ```
      */
    ConferencesService.getConferencesOfCurrentUser = function() {
          if (CurrentUser.isLogged) {
              if (!CurrentUser.conferences()) {
                  return []
              } else {
                  var conferences = []
                  for (var i = 0; i < CurrentUser.conferences().length; i++) {
                      conferences.push(ConferencesService.getConferenceById(CurrentUser.conferences()[i]))
                  }
                  return conferences
              }
          } else {
              []
          }
    }

    return ConferencesService
}
