angular.module('webapp').factory('PlacesService', PlacesService)
PlacesService.$inject = ['$firebaseArray']

/**
 * @ngdoc service
 * @name webapp.service:PlacesService
 * @description In charge of places management.
 */
function PlacesService($firebaseArray) {
    var PlacesService = {}

    PlacesService._ref = new Firebase("https://ifac2017.firebaseio.com/places")

    PlacesService.places = $firebaseArray(PlacesService._ref)

    PlacesService.addPlace = function(place) {
        return PlacesService.places.$add({
            name: place.name,
            address: place.address,
            floor: place.floor,
            maxCapacity: place.maxCapacity,
            availableCapacity: place.maxCapacity
        })
    }

    PlacesService.removePlace = function(place) {
        PlacesService.places.$remove(place)
    }

    PlacesService.loadArray = function() {
        return new Promise(function(resolve, reject) {
            PlacesService.places.$loaded().then(function() {
                resolve()
            }).catch(function() {
                reject()
            })
        })
    }

    PlacesService.getPlaceById = function(id) {
        return PlacesService.places.$getRecord(id)
    }

    PlacesService.savePlace = function(place) {
      return PlacesService.places.$save(place)
    }

    return PlacesService
}
