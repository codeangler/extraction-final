(function() {
  angular.module('extractionApp', ['ui.router', 'mwl.calendar', 'ui.bootstrap'])
    .config(configRouter)

  configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  // Establish partials of .states and .states.sub
  function configRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'html/home.html',
        controller: 'panicCtrl as pCtrl',
        onEnter: function(){
         
          // console.log('you entered home'  )
          
          // console.log('reset @ home: factpory Iterator'  )

        }
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
        url: '/dashboard/:id',
        templateUrl: 'html/dashboard.html',
        controller: 'dashboardController as dCtrl',
        data: {
            css: 'bower_components/bootstrap/dist/css/bootstrap.min.css'
          }
      })

    $urlRouterProvider.otherwise('/')
  }
}());
