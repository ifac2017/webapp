// app/services/NotificationsService.js

/**
  * Notifications service: in charge of the showing notifications
**/

angular.module('webapp').factory('NotificationsService', NotificationsService);

function NotificationsService ($mdToast) {
  var NotificationsService = {}

  NotificationsService.error = function(message) {
    $mdToast.show($mdToast.simple().textContent(message).theme('error-toast'));
  }

  NotificationsService.success = function(message) {
    $mdToast.show($mdToast.simple().textContent(message).theme('success-toast'));
  }

  NotificationsService.info = function(message) {
    $mdToast.show($mdToast.simple().textContent(message).theme('info-toast'));
  }

  NotificationsService.warn = function(message) {
    $mdToast.show($mdToast.simple().textContent(message).theme('warn-toast'));
  }

  return NotificationsService;
}
