angular.module('webapp').config(Router)
Router.$inject = ['$routeProvider']

/**
 * @ngdoc object
 * @name webapp.config:Router
 * @description
 * To do...
 */
function Router($routeProvider) {
    $routeProvider
        .when('/', {
            template: '<wa-planner layout="column"></wa-planner>',
        })
        .when('/admin', {
            template: '<wa-admin layout="column"></wa-admin>',
            resolve: {
                "currentAuth": ["AuthService", function(AuthService) {
                    return AuthService.requireAuth()
                }]
            }
        })
        .when('/profile', {
            template: '<wa-profile layout="column"></wa-profile>',
            resolve: {
                "currentAuth": ["AuthService", function(AuthService) {
                    return AuthService.requireAuth()
                }]
            }
        })
        .when('/login', {
            template: '<wa-login layout="column"></wa-login>'
        })
        .otherwise({
            redirectTo: '/'
        })
}
