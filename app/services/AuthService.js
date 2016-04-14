// app/services/AuthService.js

/**
 * Authentification service: in charge of the auth with Firebase
 **/

angular.module('webapp').factory('AuthService', AuthService);

function AuthService($firebaseAuth, $firebaseObject, $rootScope) {
    var AuthService = {}
    AuthService._ref = new Firebase("https://planner31.firebaseio.com/")
    AuthService._auth = $firebaseAuth(AuthService._ref)
    AuthService._currentUserRef = null
    AuthService.currentUser = null
    AuthService.isConnected = false

    AuthService.requireAuth = function() {
        return AuthService._auth.$requireAuth()
    }

    AuthService.signup = function(email, password, then) {
        AuthService._auth.$createUser({
            email: email,
            password: password
        }).then(function(userData) {
            then(null, userData)
        }).catch(function(error) {
            then(error, null)
        })
    }

    AuthService.login = function(email, password, then) {
        AuthService._auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(userData) {
            then(null, userData)
        }).catch(function(error) {
            then(error, null)
        })
    }

    AuthService.logout = function() {
        AuthService._auth.$unauth()
    }

    AuthService._auth.$onAuth(function(authData) {
        if (authData) {
            AuthService._currentUserRef = AuthService._ref.child("users").child(authData.uid)
            AuthService._currentUserRef.on("value", function(snapshot) {
                if (!snapshot.val()) {
                    AuthService._currentUserRef.set({
                        provider: authData.provider,
                        email: authData.password.email
                    });
                }
                AuthService.currentUser = $firebaseObject(AuthService._currentUserRef)
                AuthService.currentUser.$loaded().then(function() {
                    AuthService.isConnected = true
                    AuthService._notifierAuth()
                })

            })
        } else {
            AuthService._currentUserRef = null
            AuthService.CurrentUser = null
            AuthService.isConnected = false
            AuthService._notifierAuth()
        }
    })

    AuthService._notifierAuth = function() {
        $rootScope.$broadcast('onAuth')
    }

    return AuthService
}
