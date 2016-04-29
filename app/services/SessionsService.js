angular.module('webapp').factory('SessionsService', SessionsService)
SessionsService.$inject = ['SessionsConferencesService', 'Session', '$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:SessionsService
 * @description In charge of sessions management.
 */
function SessionsService(SessionsConferencesService, Session, $firebaseArray) {
    var SessionsService = {}

    SessionsService.sessions = SessionsConferencesService.sessions

    SessionsService.Model = Session

    SessionsService.addSession = function(session) {
        return SessionsService.sessions.$add({
            name: session.name,
            date: session.date.getTime(),
            start_time: session.start_time.getTime(),
            end_time: session.end_time.getTime()
        })
    }

    SessionsService.removeSession = function(session) {
        SessionsConferencesService.removeSession(session)
    }

    SessionsService.loadArray = function() {
        return SessionsService.sessions.$loaded()
    }

    SessionsService.getSessionById = function(id) {
        return SessionsService.sessions.$getRecord(id)
    }

    SessionsService.saveSession = function(session) {
        return SessionsConferencesService.saveSession(session)
    }

    SessionsService.addConferenceTo = function(session, conference) {
        if (!session.conferences) {
            session.conferences = []
        }
        session.conferences.push(conference)
        return SessionsService.saveSession(session)
    }

    SessionsService.getSessionsByDate = function(date) {
        return $firebaseArray(SessionsService.sessions.$ref().orderByChild("date").equalTo(date.valueOf())).$loaded()
    }

    SessionsService.getConferencesBySession = function(session) {
        return SessionsConferencesService.getConferencesBySession(session)
    }

    return SessionsService
}
