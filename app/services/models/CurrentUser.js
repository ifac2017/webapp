angular.module('webapp').factory('CurrentUser', CurrentUser)
CurrentUser.$inject = ['ConferencesService', '$firebaseObject']

/**
 * @ngdoc service
 * @name webapp.service:CurrentUser
 * @description Represents the current logged user
 */
function CurrentUser(ConferencesService, $firebaseObject) {
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

    CurrentUser.save = function() {
        return CurrentUser._user.$save()
    }

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

    CurrentUser.getConferences = function() {
        return new Promise(function(resolve, reject) {
            if (CurrentUser.isLogged) {
                if (!CurrentUser._user.conferences) {
                    reject("any conferences found")
                } else {
                    var conferences = []
                    for (var i = 0; i < CurrentUser._user.conferences.length; i++) {
                        conferences.push(ConferencesService.getConferenceById(CurrentUser._user.conferences[i]))
                    }
                    resolve(conferences)
                }
            } else {
                reject("not logged")
            }
        })
    }

    return CurrentUser
}
