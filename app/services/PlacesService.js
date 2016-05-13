angular.module('webapp').factory('PlacesService', PlacesService)
PlacesService.$inject = ['$firebaseArray', 'Place']

/**
 * @ngdoc service
 * @name webapp.service:PlacesService
 * @description In charge of places management.
 */
function PlacesService($firebaseArray, Place) {
    var PlacesService = {}

    /**
     * @ngdoc property
     * @name _ref
     * @propertyOf webapp.service:PlacesService
     * @description Reference to the Firebase places database
     */
    PlacesService._ref = new Firebase("https://ifac2017.firebaseio.com/places")

    /**
     * @ngdoc property
     * @name places
     * @propertyOf webapp.service:PlacesService
     * @description Places list
     */
    PlacesService.places = $firebaseArray(PlacesService._ref)

    /**
     * @ngdoc property
     * @name Model
     * @propertyOf webapp.service:PlacesService
     * @description Place model
     */
    PlacesService.Model = Place

    /**
     * @ngdoc method
     * @name addPlace
     * @methodOf webapp.service:PlacesService
     * @description Add a place to firebase
     * @param {Place} place - The new place
     * @returns {Promise} ok if the place was well added
     * @example
      ```javascript
      PlacesService.addPlace(place)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    PlacesService.addPlace = function(place) {
        return PlacesService.places.$add({
            name: place.name,
            address: place.address,
            color: place.color
        })
    }

    /**
     * @ngdoc method
     * @name removePlace
     * @methodOf webapp.service:PlacesService
     * @description Remove a place from firebase
     * @param {Place} place - The place to be removed
     * @example
      ```javascript
      PlacesService.removePlace(place)
      ```
      */
    PlacesService.removePlace = function(place) {
        PlacesService.places.$remove(place)
    }

    /**
     * @ngdoc method
     * @name loadArray
     * @methodOf webapp.service:PlacesService
     * @description Return a promise indicating if the places list is loaded
     * @returns {Promise} ok if the places list is loaded
     * @example
      ```javascript
      PlacesService.loadArray()
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    PlacesService.loadArray = function() {
        return PlacesService.places.$loaded()
    }

    /**
     * @ngdoc method
     * @name getPlaceById
     * @methodOf webapp.service:PlacesService
     * @description Return a promise with the place
     * @param {ID} id - The place id
     * @returns {Promise} the place found if it exists
     * @example
      ```javascript
      PlacesService.getPlaceById(id)
      .then(function(place) {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    PlacesService.getPlaceById = function(id) {
        return PlacesService.places.$getRecord(id)
    }

    /**
     * @ngdoc method
     * @name savePlace
     * @methodOf webapp.service:PlacesService
     * @description Return a promise indicating if the place was saved
     * @param {Place} place - The place to be saved
     * @returns {Promise} ok if the place was saved
     * @example
      ```javascript
      PlacesService.savePlace(place)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    PlacesService.savePlace = function(place) {
      return PlacesService.places.$save(place)
    }

    return PlacesService
}
