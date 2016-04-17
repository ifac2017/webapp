angular.module('webapp').config(Router)

/**
 * @ngdoc object
 * @name webapp.config:Router
 * @description
 * To do...
 */
function Router($routeProvider) {
    $routeProvider
        .when('/', {
            template: '<wa-planner></wa-planner>',
        })
        .when('/admin', {
            templateUrl: '<wa-admin></wa-admin>',
            resolve: {
                "currentAuth": ["AuthService", function(AuthService) {
                    return AuthService.requireAuth()
                }]
            }
        })
        .when('/profile', {
            template: '<wa-profile></wa-profile>',
            resolve: {
                "currentAuth": ["AuthService", function(AuthService) {
                    return AuthService.requireAuth()
                }]
            }
        })
        .when('/login', {
            template: '<wa-login></wa-login>'
        })
        .otherwise({
            redirectTo: '/'
        })
}
