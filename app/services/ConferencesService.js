angular.module('webapp').factory('ConferencesService', ConferencesService)
ConferencesService.$inject = ['SessionsService', 'SessionsConferencesService']

/**
 * @ngdoc service
 * @name webapp.service:ConferencesService
 * @description In charge of conferences management.
 */
function ConferencesService(SessionsService, SessionsConferencesService) {
    var ConferencesService = {}

    ConferencesService.conferences = SessionsConferencesService.conferences

    ConferencesService.addConference = function(conference, session) {
        return ConferencesService.conferences.$add({
            name: conference.name,
            date: conference.date.getTime(),
            start_time: conference.start_time.getTime(),
            end_time: conference.end_time.getTime(),
            placeId: conference.placeId,
            room: conference.room,
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

    return ConferencesService
}
