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
        return new Promise(function(resolve, reject) {
            ConferencesService.conferences.$add({
                name: conference.name,
                date: conference.date.getTime(),
                start_time: conference.start_time.getTime(),
                end_time: conference.end_time.getTime(),
                place: conference.place,
                room: conference.room,
                speakers: conference.speakers,
                sessionId: conference.sessionId,
                abstract: conference.abstract
            }).then(function(ref) {
                SessionsService.addConferenceTo(session, ref.key()).then(function() {
                    resolve()
                }).catch(function() {
                    reject()
                })
            }).catch(function() {
                reject()
            })
        })
    }

    ConferencesService.removeConference = function(conference) {
        ConferencesService.conferences.$remove(conference)
    }

    ConferencesService.loadArray = function() {
        return new Promise(function(resolve, reject) {
            ConferencesService.conferences.$loaded().then(function() {
                resolve()
            }).catch(function() {
                reject()
            })
        })
    }

    ConferencesService.getConferenceById = function(id) {
        return ConferencesService.conferences.$getRecord(id)
    }

    ConferencesService.saveConference = function(conference) {
        return ConferencesService.conferences.$save(conference)
    }

    return ConferencesService
}
