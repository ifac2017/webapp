// app/controllers/Theme.js

/**
 * Config app theme
 **/

angular.module('webapp').config(Theme);

function Theme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue')
        .warnPalette('red');

    $mdThemingProvider.theme("error-toast")
    $mdThemingProvider.theme("success-toast")
    $mdThemingProvider.theme("info-toast")
    $mdThemingProvider.theme("warn-toast")
}
