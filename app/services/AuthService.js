angular.module('webapp').factory('AuthService', AuthService)

/**
 * @ngdoc service
 * @name webapp.service:AuthService
 * @description In charge of the authentification with Firebase.
 */
function AuthService($firebaseAuth, $firebaseObject, $rootScope) {
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
     * @name currentUser
     * @propertyOf webapp.service:AuthService
     * @description Current logged user
     */
    AuthService.currentUser = null

    /**
     * @ngdoc property
     * @name isConnected
     * @propertyOf webapp.service:AuthService
     * @description True if the user is logged False otherwise.
     */
    AuthService.isConnected = false

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
     * @name _processAuth
     * @methodOf webapp.service:AuthService
     * @description Processing the user authentication by binding the currentUser to the root scope.
     * @param {Object} authData - The user's data
     */
    AuthService._processAuth = function(authData) {
        var ref = AuthService._ref.child("users").child(authData.uid)
        AuthService.currentUser = $firebaseObject(ref)
        AuthService.currentUser.$loaded().then(function() {
            AuthService.isConnected = true
            AuthService.currentUser.$bindTo($rootScope, "CurrentUser")
            AuthService._notifierAuth()
        })
    }

    /**
     * @ngdoc method
     * @name _resetAuth
     * @methodOf webapp.service:AuthService
     * @description Reset the user authentication state.
     */
    AuthService._resetAuth = function() {
        AuthService.CurrentUser = null
        AuthService.isConnected = false
        AuthService._notifierAuth()
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
            AuthService._processAuth(authData)
        } else {
            AuthService._resetAuth()
        }
    })

    /**
     * @ngdoc event
     * @name _notifierAuth
     * @eventOf webapp.service:AuthService
     * @eventType broadcast
     * @description Notify the root scope of an authentication state update by broadcasting the onAuth event.
     */
    AuthService._notifierAuth = function() {
        $rootScope.$broadcast('onAuth')
    }

    return AuthService
}
