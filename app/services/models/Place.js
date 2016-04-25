angular.module('webapp').factory('Place', Place)
Place.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Place
 * @description Represents a place
 */
function Place() {
    return {
        name: null,
        address: null
    }
}
