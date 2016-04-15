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
            templateUrl: 'views/planner.html',
            controller: 'PlannerCtrl',
            controllerAs: 'plannerCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin/home.html',
            controller: 'AdminCtrl',
            controllerAs: 'adminCtrl',
            resolve: {
                "currentAuth": ["AuthService", function(AuthService) {
                    return AuthService.requireAuth()
                }]
            }
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profileCtrl',
            resolve: {
                "currentAuth": ["AuthService", function(AuthService) {
                    return AuthService.requireAuth()
                }]
            }
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}
