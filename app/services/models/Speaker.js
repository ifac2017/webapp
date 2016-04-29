angular.module('webapp').factory('Speaker', Speaker)
Speaker.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Speaker
 * @description Represents a speaker
 */
function Speaker() {
    var Speaker = {
        name: null,
        institution: null
    }

    return Speaker
}
