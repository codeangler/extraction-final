angular.module('extractionApp', ['ui.router'])
  .config(configRouter)

configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

// Establish partials of .states and .states.sub
function configRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'html/home.html',
      controller: 'panicCtrl as pCtrl',
    })
    .state('panicGame', {
      url: '/panic-game',
      templateUrl: 'html/panic-game.html',
      controller: 'panicCtrl as pCtrl'
    })
    .state('panicGame.rating', {
      templateUrl: 'html/panic-rating.html'
    })
    .state('panicGame.intervention', {
      templateUrl: 'html/panic-intervention.html'
    })
    .state('panicRecord', {
      url: '/panic-record',
      templateUrl: 'html/panic-record.html',
      controller: 'panicCtrl as pCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'html/dashboard.html',
      controller: 'dashboardController as dCtrl'
    })

  $urlRouterProvider.otherwise('/')
}
