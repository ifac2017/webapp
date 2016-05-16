angular.module('webapp').factory('CurrentUser', CurrentUser)
CurrentUser.$inject = ['$firebaseObject']

/**
 * @ngdoc service
 * @name webapp.service:CurrentUser
 * @description Represents the current logged user
 */
function CurrentUser($firebaseObject) {
    var CurrentUser = {}

    CurrentUser._ref = new Firebase("https://ifac2017.firebaseio.com/users")

    /**
     * @ngdoc property
     * @name _user
     * @propertyOf webapp.service:CurrentUser
     * @description Firebase instance of the connected user
     */
    CurrentUser._user = null

    /**
     * @ngdoc property
     * @name isLogged
     * @propertyOf webapp.service:CurrentUser
     * @description True if the user is connected false otherwise
     */
    CurrentUser.isLogged = false

    /**
     * @ngdoc property
     * @name uid
     * @propertyOf webapp.service:CurrentUser
     * @description Firebase id of the connected user
     */
    CurrentUser.uid = null

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
     * @name conferences
     * @methodOf webapp.service:CurrentUser
     * @description Conferences of the connected user
     */
    CurrentUser.conferences = function() {
      return CurrentUser._user.conferences
    }

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
    CurrentUser.create = function(uid, email, role) {
        CurrentUser.isLogged = true
        CurrentUser.uid = uid
        CurrentUser.email = email
        CurrentUser.role = role
        CurrentUser._user = $firebaseObject(CurrentUser._ref.child(CurrentUser.uid))
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

    /**
     * @ngdoc method
     * @name save
     * @methodOf webapp.service:CurrentUser
     * @description return a promise validate when the user is saved in Firebase
     * @returns {Promise} ok if the user is well saved
     * @example
      ```javascript
      CurrentUser.save()
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    CurrentUser.save = function() {
        return CurrentUser._user.$save()
    }

    /**
     * @ngdoc method
     * @name removeConference
     * @methodOf webapp.service:CurrentUser
     * @description return a promise validate when the user is saved in Firebase
     * @param {Conference} conference - the conference to be removed
     * @example
      ```javascript
      CurrentUser.removeConference(conference)
      ```
      */
    CurrentUser.removeConference = function(conference) {
      CurrentUser._user.conferences.splice(CurrentUser._user.conferences.indexOf(conference.$id), 1)
      CurrentUser.save()
    }

    /**
     * @ngdoc method
     * @name saveConference
     * @methodOf webapp.service:CurrentUser
     * @description return a promise validate when the user is saved in Firebase
     * @param {Conference} conference - the conference to be added
     * @returns {Promise} ok if the conference and the user are well saved
     * @example
      ```javascript
      CurrentUser.saveConference(conference)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      */
    CurrentUser.saveConference = function(conference) {
        return new Promise(function(resolve, reject) {
            if (CurrentUser.isLogged) {
                if (!CurrentUser._user.conferences) {
                    CurrentUser._user.conferences = []
                }
                if (CurrentUser._user.conferences.indexOf(conference.$id) > -1) {
                    resolve()
                } else {
                    CurrentUser._user.conferences.push(conference.$id)
                    CurrentUser.save().then(function() {
                        resolve()
                    }).catch(function() {
                        reject()
                    })
                }
            } else {
                reject()
            }
        })
    }
    return CurrentUser
}
