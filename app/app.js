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

angular.module('webapp', ['ngMaterial', 'firebase', 'ngMessages', 'ngComponentRouter', 'ngMap'])
.value('$routerRootComponent', 'waApp')

require('./**/*.js', {mode: 'expand'})
