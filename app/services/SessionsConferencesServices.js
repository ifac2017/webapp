angular.module('webapp').factory('SessionsConferencesService', SessionsConferencesService)
SessionsConferencesService.$inject = ['$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:SessionsConferencesService
 * @description In charge of sessions and conferences management.
 */
function SessionsConferencesService($firebaseArray) {
    var SessionsConferencesService = {}

    SessionsConferencesService._refSessions = new Firebase("https://ifac2017.firebaseio.com/sessions")

    SessionsConferencesService._refConferences = new Firebase("https://ifac2017.firebaseio.com/conferences")

    SessionsConferencesService.sessions = $firebaseArray(SessionsConferencesService._refSessions)

    SessionsConferencesService.conferences = $firebaseArray(SessionsConferencesService._refConferences)

    SessionsConferencesService.removeSession = function(session) {
        if (session.conferences) {
            for (var i = 0; i < session.conferences.length; i++) {
                SessionsConferencesService.removeConference(SessionsConferencesService.getConferenceById(session.conferences[i]), session)
            }
        }
        SessionsConferencesService.sessions.$remove(session)
    }

    SessionsConferencesService.removeConference = function(conference, session) {
        session.conferences.splice(session.conferences.indexOf(conference.$id), 1)
        SessionsConferencesService.saveSession(session)
        SessionsConferencesService.conferences.$remove(conference)
    }

    SessionsConferencesService.getConferenceById = function(id) {
        return SessionsConferencesService.conferences.$getRecord(id)
    }

    SessionsConferencesService.getConferencesBySession = function(session) {
        return new Promise(function(resolve, reject) {
            if (typeof session.conferences !== 'undefined') {
                var conferences = []
                for (var i = 0; i < session.conferences.length; i++) {
                    conferences.push(SessionsConferencesService.getConferenceById(session.conferences[i]))
                }
                resolve(conferences)
            } else {
                reject("any conference found for this session")
            }
        })
    }

    SessionsConferencesService.saveSession = function(session) {
        return SessionsConferencesService.sessions.$save(session)
    }

    return SessionsConferencesService
}
