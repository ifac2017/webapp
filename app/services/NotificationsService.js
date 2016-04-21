angular.module('webapp').factory('NotificationsService', NotificationsService)
NotificationsService.$inject = ['$mdToast']

/**
 * @ngdoc service
 * @name webapp.service:NotificationsService
 * @description In charge of showing notifications.
 * @requires $mdToast
 */
function NotificationsService($mdToast) {
    var NotificationsService = {}

    /**
     * @ngdoc method
     * @name error
     * @methodOf webapp.service:NotificationsService
     * @description Show an error notification with a message.
     * @param {String} message - The message
     * @example
      ```javascript
      NotificationsService.error("Please verify your password...")
      ```
     */
    NotificationsService.error = function(message) {
        $mdToast.show($mdToast.simple().position("top right").textContent(message).theme('error-toast'))
    }

    /**
     * @ngdoc method
     * @name success
     * @methodOf webapp.service:NotificationsService
     * @description Show a success notification with a message.
     * @param {String} message - The message
     * @example
      ```javascript
      NotificationsService.success("You got it !")
      ```
     */
    NotificationsService.success = function(message) {
        $mdToast.show($mdToast.simple().position("top right").textContent(message).theme('success-toast'))
    }

    /**
     * @ngdoc method
     * @name info
     * @methodOf webapp.service:NotificationsService
     * @description Show an info notification with a message.
     * @param {String} message - The message
     * @example
      ```javascript
      NotificationsService.info("5 new messages in your mailbox.")
      ```
     */
    NotificationsService.info = function(message) {
        $mdToast.show($mdToast.simple().position("top right").textContent(message).theme('info-toast'))
    }

    /**
     * @ngdoc method
     * @name warn
     * @methodOf webapp.service:NotificationsService
     * @description Show a warning notification with a message.
     * @param {String} message - The message
     * @example
      ```javascript
      NotificationsService.warn("This service is currently in Beta.")
      ```
     */
    NotificationsService.warn = function(message) {
        $mdToast.show($mdToast.simple().position("top right").textContent(message).theme('warn-toast'))
    }

    return NotificationsService
}
