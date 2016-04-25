angular.module('webapp').factory('Speaker', Speaker)
Speaker.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Speaker
 * @description Represents a speaker
 */
function Speaker() {
    return {
      name: null,
      origin: null
    }
}
