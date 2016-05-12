angular.module('webapp').factory('ConferencesService', ConferencesService)
ConferencesService.$inject = ['CurrentUser', 'SessionsService', 'SessionsConferencesService', 'Conference']

/**
 * @ngdoc service
 * @name webapp.service:ConferencesService
 * @description In charge of conferences management.
 */
function ConferencesService(CurrentUser, SessionsService, SessionsConferencesService, Conference) {
    var ConferencesService = {}

    ConferencesService.conferences = SessionsConferencesService.conferences

    ConferencesService.Model = Conference

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

    ConferencesService.removeConference = function(conference, session) {
        SessionsConferencesService.removeConference(conference, session)
    }

    ConferencesService.loadArray = function() {
        return ConferencesService.conferences.$loaded()
    }

    ConferencesService.getConferenceById = function(id) {
        return SessionsConferencesService.getConferenceById(id)
    }

    ConferencesService.saveConference = function(conference) {
        return ConferencesService.conferences.$save(conference)
    }

    ConferencesService.getConferencesOfCurrentUser = function() {
      return new Promise(function(resolve, reject) {
          if (CurrentUser.isLogged) {
              if (!CurrentUser.conferences()) {
                  reject("any conferences found")
              } else {
                  var conferences = []
                  for (var i = 0; i < CurrentUser.conferences().length; i++) {
                      conferences.push(ConferencesService.getConferenceById(CurrentUser.conferences()[i]))
                  }
                  resolve(conferences)
              }
          } else {
              reject("not logged")
          }
      })
    }

    return ConferencesService
}
