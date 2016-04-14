// app/run/Resolver.js

/**
 * Resolver for routing
 **/
 angular.module('webapp').run(Resolver);

 function Resolver($rootScope, $location) {
     $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
         if (error === "AUTH_REQUIRED") {
             $location.path("/login");
         }
     })
 }
