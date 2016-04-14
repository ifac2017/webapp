// app/controllers/Router.js

/**
 * Router of the app
 **/

angular.module('webapp').config(Router);

function Router($routeProvider) {
    $routeProvider
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
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/admin'
        })
}
