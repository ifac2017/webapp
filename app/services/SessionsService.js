angular.module('webapp').factory('SessionsService', SessionsService)
SessionsService.$inject = ['SessionsConferencesService']

/**
 * @ngdoc service
 * @name webapp.service:SessionsService
 * @description In charge of sessions management.
 */
function SessionsService(SessionsConferencesService) {
    var SessionsService = {}

    SessionsService.sessions = SessionsConferencesService.sessions

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
        return SessionsService.sessions.$save(session)
    }

    SessionsService.addConferenceTo = function(session, conference) {
        if (!session.conferences) {
            session.conferences = []
        }
        session.conferences.push(conference)
        return SessionsService.saveSession(session)
    }

    return SessionsService
}
