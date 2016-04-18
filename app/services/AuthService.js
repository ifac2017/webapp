angular.module('webapp').factory('AuthService', AuthService)
AuthService.$inject = ['$firebaseAuth', '$firebaseObject', 'CurrentUser']

/**
 * @ngdoc service
 * @name webapp.service:AuthService
 * @description In charge of the authentification with Firebase.
 * @requires $firebaseAuth
 * @requires $firebaseObject
 * @requires CurrentUser
 */
function AuthService($firebaseAuth, $firebaseObject, CurrentUser) {
    var AuthService = {}

    /**
     * @ngdoc property
     * @name _ref
     * @propertyOf webapp.service:AuthService
     * @description Reference to the Firebase database
     */
    AuthService._ref = new Firebase("https://planner31.firebaseio.com/")

    /**
     * @ngdoc property
     * @name _auth
     * @propertyOf webapp.service:AuthService
     * @description Authentification manager of the app
     */
    AuthService._auth = $firebaseAuth(AuthService._ref)

    /**
     * @ngdoc method
     * @name requireAuth
     * @methodOf webapp.service:AuthService
     * @description Returns a promise with the current authentication state if the user is authentificated but otherwise rejects the promise.
     * @returns {Promise} the promise require auth
     * @example
      ```javascript
      AuthService.requireAuth()
      ```
      */
    AuthService.requireAuth = function() {
        return AuthService._auth.$requireAuth()
    }

    /**
     * @ngdoc method
     * @name signup
     * @methodOf webapp.service:AuthService
     * @description Signup the user to Firebase
     * @param {String} email - The user's email
     * @param {String} password - The user's password
     * @returns {Promise} the promise signup auth
     * @example
      ```javascript
      ```javascript
      AuthService.signup(vm.user.email, vm.user.password)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
      ```
      */
    AuthService.signup = function(email, password) {
        return new Promise(function(resolve, reject) {
            AuthService._auth.$createUser({
                email: email,
                password: password
            }).then(function(authData) {
                var ref = AuthService._ref.child("users").child(authData.uid)
                ref.on("value", function(snapshot) {
                    ref.set({
                        email: email,
                        role: "user"
                    })
                    resolve()
                })
            }).catch(function(error) {
                reject(error)
            })
        })
    }

    /**
     * @ngdoc method
     * @name login
     * @methodOf webapp.service:AuthService
     * @description Login the user to Firebase
     * @param {String} email - The user's email
     * @param {String} password - The user's password
     * @returns {Promise} the promise login auth
     * @example
      ```javascript
      AuthService.login(vm.user.email, vm.user.password)
      .then(function() {
        // success...
      })
      .catch(function(error) {
        // error...
      })
      ```
     */
    AuthService.login = function(email, password) {
        return AuthService._auth.$authWithPassword({
            email: email,
            password: password
        })
    }

    /**
     * @ngdoc method
     * @name logout
     * @methodOf webapp.service:AuthService
     * @description Logout the user from Firebase.
     * @example
      ```javascript
      AuthService.logout()
      ```
     */
    AuthService.logout = function() {
        AuthService._auth.$unauth()
    }

    /**
     * @ngdoc method
     * @name $onAuth
     * @methodOf webapp.service:AuthService
     * @description Firebase event triggered on authentication state update. If authData is null then the user is disconnected.
     * @param {Object} authData - The user's data
     */
    AuthService._auth.$onAuth(function(authData) {
        if (authData) {
            var ref = AuthService._ref.child("users").child(authData.uid)
            var user = $firebaseObject(ref)
            user.$loaded().then(function() {
                CurrentUser.create(user.email, user.role)
            })
        } else {
            CurrentUser.clear()
        }
    })

    return AuthService
}
