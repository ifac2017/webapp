angular.module('webapp').factory('Place', Place)
Place.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Place
 * @description Represents a place
 */
function Place() {
    var Place = {
        name: null,
        address: null
    }

    Place.reset = function() {
      Place.name = null
      Place.address = null
    }

    return Place
}
