angular.module('webapp').factory('AuthService', AuthService)
AuthService.$inject = ['$firebaseAuth', '$firebaseObject']

/**
 * @ngdoc service
 * @name webapp.service:AuthService
 * @description In charge of the authentification with Firebase.
 */
function AuthService($firebaseAuth, $firebaseObject) {
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
     * @ngdoc property
     * @name _currentUser
     * @propertyOf webapp.service:AuthService
     * @description Current logged user
     */
    AuthService._currentUser = {
        isLogged: false,
        email: null,
        role: null
    }

    AuthService.getCurrentUser = function() {
        return AuthService._currentUser;
    }

    /**
     * @ngdoc method
     * @name requireAuth
     * @methodOf webapp.service:AuthService
     * @description Returns a promise with the current authentication state if the user is authentificated but otherwise rejects the promise.
     * @returns {Promise} requireAuth
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
     * @param {Callback} then(error) - The signup callback : if no error occurred then error is null.
     * @example
      ```javascript
      AuthService.signup(email, password, function(error) {
        if (error) {
          // error...
        } else {
          // success...
        }
      })
      ```
      */
    AuthService.signup = function(email, password, then) {
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
                then()
            })
        }).catch(function(error) {
            then(error)
        })
    }

    /**
     * @ngdoc method
     * @name login
     * @methodOf webapp.service:AuthService
     * @description Login the user to Firebase
     * @param {String} email - The user's email
     * @param {String} password - The user's password
     * @param {Callback} then(error) - The login callback : if no error occurred then error is null.
     * @example
      ```javascript
      AuthService.login(email, password, function(error) {
        if (error) {
          // error...
        } else {
          // success...
        }
      })
      ```
     */
    AuthService.login = function(email, password, then) {
        AuthService._auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            then()
        }).catch(function(error) {
            then(error)
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
                AuthService._currentUser.email = user.email
                AuthService._currentUser.isLogged = true
                AuthService._currentUser.role = user.role
            })
        } else {
            AuthService._currentUser.email = null
            AuthService._currentUser.isLogged = false
            AuthService._currentUser.role = null
        }
    })

    return AuthService
}
