angular.module('webapp').factory('ConferencesService', ConferencesService)
ConferencesService.$inject = ['SessionsService', '$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:ConferencesService
 * @description In charge of conferences management.
 */
function ConferencesService(SessionsService, $firebaseArray) {
    var ConferencesService = {}

    ConferencesService._ref = new Firebase("https://ifac2017.firebaseio.com/conferences")

    ConferencesService.conferences = $firebaseArray(ConferencesService._ref)

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

    ConferencesService.removeConference = function(conference) {
        ConferencesService.conferences.$remove(conference)
    }

    ConferencesService.loadArray = function() {
        return ConferencesService.conferences.$loaded()
    }

    ConferencesService.getConferenceById = function(id) {
        return ConferencesService.conferences.$getRecord(id)
    }

    ConferencesService.saveConference = function(conference) {
        return ConferencesService.conferences.$save(conference)
    }

    return ConferencesService
}
