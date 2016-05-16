angular.module('webapp').factory('Place', Place)
Place.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:Place
 * @description Represents a place
 *  A place is characterized by
 *  - a name: `String`
 *  - an address: `String`
 *  - a color: `String`
 */
function Place() {
    var Place = {
        name: null,
        address: null,
        color: null
    }

    Place.reset = function() {
      Place.name = null
      Place.address = null
      Place.color = null
    }

    return Place
}
