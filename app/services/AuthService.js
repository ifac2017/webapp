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
    AuthService._ref = new Firebase("https://ifac2017.firebaseio.com/")

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
        return new Promise(function(resolve, reject) {
            AuthService._auth.$waitForAuth()
                .then(function(authData) {
                    if (authData) {
                        AuthService._createCurrentUser(authData.uid).then(function() {
                            resolve()
                        }).catch(function(error) {
                            reject(error)
                        })
                    } else {
                        reject("error requireAuth")
                    }
                })
                .catch(function(error) {
                    reject(error)
                })
        })
    }

    /**
     * @ngdoc method
     * @name requireUnauth
     * @methodOf webapp.service:AuthService
     * @description Returns a promise accepted if the user is unauthentificated but otherwise rejects the promise.
     * @returns {Promise} the promise require unauth
     * @example
      ```javascript
      AuthService.requireUnauth()
      ```
      */
    AuthService.requireUnauth = function() {
        return new Promise(function(resolve, reject) {
            AuthService.requireAuth()
                .then(function() {
                    reject("Already connected")
                })
                .catch(function() {
                    resolve()
                })
        })
    }

    /**
     * @ngdoc method
     * @name requireAdminAuth
     * @methodOf webapp.service:AuthService
     * @description Returns a promise accepted if the user is authentificated and has admin role but otherwise rejects the promise.
     * @returns {Promise} the promise require admin auth
     * @example
      ```javascript
      AuthService.requireAdminAuth()
      ```
      */
    AuthService.requireAdminAuth = function() {
        return new Promise(function(resolve, reject) {
            AuthService.requireAuth()
                .then(function(authData) {
                    AuthService._createCurrentUser(authData.uid).then(function() {
                        if (CurrentUser.role === "admin") {
                            resolve()
                        } else {
                            reject("You are not an admin !")
                        }
                    }).catch(function(error) {
                        reject(error)
                    })
                })
                .catch(function(error) {
                    reject(error)
                })
        })
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
            AuthService._createCurrentUser(authData.uid)
        } else {
            CurrentUser.clear()
        }
    })

    /**
     * @ngdoc method
     * @name _createCurrentUser
     * @methodOf webapp.service:AuthService
     * @description create the current user
     * @param {Object} uid - The user's Firebase id
     * @returns {Promise} the promise when user is locally created
     */
    AuthService._createCurrentUser = function(uid) {
        return new Promise(function(resolve, reject) {
            if (!CurrentUser.isLogged) {
                var ref = AuthService._ref.child("users").child(uid)
                var user = $firebaseObject(ref)
                user.$loaded().then(function() {
                    CurrentUser.create(user.$id, user.email, user.role)
                    resolve()
                })
            } else {
                resolve()
            }
        })
    }

    return AuthService
}
