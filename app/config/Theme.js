angular.module('webapp').config(Theme)

/**
 * @ngdoc object
 * @name webapp.config:Theme
 * @description
 * To do...
 */
function Theme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue')
        .warnPalette('red')

    $mdThemingProvider.theme("error-toast")
    $mdThemingProvider.theme("success-toast")
    $mdThemingProvider.theme("info-toast")
    $mdThemingProvider.theme("warn-toast")
}
