// app/app.js

/**
  * Require all the app dependencies
  * Create the main module of the app
**/
require('angular-material')
require('angularfire')
require('firebase')
require('angular-messages')
require('ngmap')
require('angular-moment')

angular.module('webapp', ['ngMaterial', 'firebase', 'ngMessages', 'ngComponentRouter', 'ngMap', 'angularMoment'])
.value('$routerRootComponent', 'waApp')

require('./**/*.js', {mode: 'expand'})
