angular.module('webapp').run(Resolver)
Resolver.$inject = ['$rootScope', '$location']

/**
 * @ngdoc object
 * @name webapp.run:Resolver
 * @requires $rootScope
 * @requires $location
 * @description
 * Handle routing event
 */
function Resolver($rootScope, $location) {

    /**
     * @ngdoc method
     * @name $on
     * @methodOf webapp.run:Resolver
     * @description Listen for the $routeChangeError event sent by the Router when required an authentificated state on a route in order to redirect to the login page if the user is not logged in the app.
     */
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $location.path("/login")
        }
    })
}
