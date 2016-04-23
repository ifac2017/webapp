angular.module('webapp').factory('SessionsService', SessionsService)
SessionsService.$inject = ['$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:SessionsService
 * @description In charge of sessions management.
 */
function SessionsService($firebaseArray) {
    var SessionsService = {}

    SessionsService._ref = new Firebase("https://ifac2017.firebaseio.com/sessions")

    SessionsService.sessions = $firebaseArray(SessionsService._ref)

    SessionsService.addSession = function(session) {
        return SessionsService.sessions.$add({
            name: session.name,
            date: session.date.getTime(),
            start_time: session.start_time.getTime(),
            end_time: session.end_time.getTime()
        })
    }

    SessionsService.removeSession = function(session) {
        SessionsService.sessions.$remove(session)
    }

    SessionsService.loadArray = function() {
        return new Promise(function(resolve, reject) {
            SessionsService.sessions.$loaded().then(function() {
                resolve()
            }).catch(function() {
                reject()
            })
        })
    }

    SessionsService.getSessionById = function(id) {
        return SessionsService.sessions.$getRecord(id)
    }

    SessionsService.saveSession = function(session) {
        return SessionsService.sessions.$save(session)
    }

    return SessionsService
}
