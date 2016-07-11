angular.module('extractionApp', ['ui.router'])
  .config(configRouter)
  
configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

// Establish partials of .states and .states.sub
function configRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'panicCtrl as pCtrl',
    })
    .state('panicGame', {
      url: '/panic-game',
      templateUrl: 'partials/panic-game.html',
      controller: 'panicCtrl as pCtrl'
    })
    .state('panicGame.rating', {
      templateUrl: 'partials/panic-rating.html'
    })
    .state('panicGame.intervention', {
      templateUrl: 'partials/panic-intervention.html'
    })
    .state('panicRecord', {
      url: '/panic-record',
      templateUrl: 'partials/panic-record.html',
      controller: 'panicCtrl as pCtrl'
    })

  $urlRouterProvider.otherwise('/')
}

