// app/services/CurrentUser.js

/**
 * CurrentUser model: represents the user of the session
 **/

angular.module('webapp').factory('CurrentUser', CurrentUser);

function CurrentUser() {
    var CurrentUser = {
      exist: false,
      email: null
    }

    CurrentUser.add = function(email) {
      CurrentUser.email = email
      CurrentUser.exist = true
      
    }

    CurrentUser.remove = function() {
      CurrentUser.email = null
      CurrentUser.exist = false
    }

    return CurrentUser
}
