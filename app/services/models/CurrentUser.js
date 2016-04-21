angular.module('webapp').factory('CurrentUser', CurrentUser)
CurrentUser.$inject = []

/**
 * @ngdoc service
 * @name webapp.service:CurrentUser
 * @description Represents the current logged user
 */
function CurrentUser() {
    var CurrentUser = {}

    /**
     * @ngdoc property
     * @name isLogged
     * @propertyOf webapp.service:CurrentUser
     * @description True if the user is connected false otherwise
     */
    CurrentUser.isLogged = false

    /**
     * @ngdoc property
     * @name email
     * @propertyOf webapp.service:CurrentUser
     * @description Email address of the connected user
     */
    CurrentUser.email = null

    /**
     * @ngdoc property
     * @name role
     * @propertyOf webapp.service:CurrentUser
     * @description Role of the connected user
     */
    CurrentUser.role = null

    /**
     * @ngdoc method
     * @name create
     * @methodOf webapp.service:CurrentUser
     * @description Create the current user
     * @example
      ```javascript
      CurrentUser.create(email, role)
      ```
      */
    CurrentUser.create = function(email, role) {
        CurrentUser.isLogged = true
        CurrentUser.email = email
        CurrentUser.role = role
    }

    /**
     * @ngdoc method
     * @name clear
     * @methodOf webapp.service:CurrentUser
     * @description Clear the current user
     * @example
      ```javascript
      CurrentUser.clear()
      ```
      */
    CurrentUser.clear = function() {
        CurrentUser.isLogged = false
        CurrentUser.role = null
        CurrentUser.email = null
    }

    /**
     * @ngdoc method
     * @name isAdmin
     * @methodOf webapp.service:CurrentUser
     * @description True if the user has the admin role False otherwise
     * @example
      ```javascript
      CurrentUser.isAdmin()
      ```
      */
    CurrentUser.isAdmin = function() {
      return CurrentUser.role === "admin"
    }

    return CurrentUser
}
