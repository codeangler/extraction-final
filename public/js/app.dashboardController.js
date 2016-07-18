//app.userDashboard.controller.js
angular.module('extractionApp')
  .controller('dashboardController', dCtrl)

dCtrl.$inject = ['$http', '$stateParams', 'GameLogFactory']

function dCtrl($http, $stateParams, GameLogFactory) {
  var dCtrl = this;
  // var gLogFactory = GameLogFactory
  console.log('is this a session? user was loggedIn:', GameLogFactory)


  $http.get('/api/v1/users/' + $stateParams.id)
    .then(function(returnData) {
      // console.log(returnData, 'at app.dashboardController')
      dCtrl.theUser = returnData.data.user
      dCtrl.thePatients = returnData.data.patients

      console.log('app.dashboardController', returnData)
      if (GameLogFactory.userWasLoggedIn === false) {
        GameLogFactory.logUpdate.gameUser = dCtrl.theUser._id;
        console.log('user was not logged in during game play, LogUpdate', GameLogFactory.logUpdate)

        $http.post('api/v1/gamelogs', GameLogFactory.logUpdate)
          .then(function(returnData) {
            //  Patient log-in request for game records
            $http.get('/api/v1/gamelogs/' + $stateParams.id)
              .then(function(returnGameData) {
                console.log('what"s the callback', returnGameData)
                dCtrl.theGameLog = returnGameData.data
                  // var timestamp = dCtrl.theGameLog[0].gameDate
                  // var datestamp = new Date(timestamp)
                  // console.log( datestamp, 'return game data app.dashboardController.js')
              })
            console.log('check in the db for the new game fool.')
          })
      } else {
        //  Patient log-in request for game records
        $http.get('/api/v1/gamelogs/' + $stateParams.id)
          .then(function(returnGameData) {
            dCtrl.theGameLog = returnGameData.data
              // var timestamp = dCtrl.theGameLog[0].gameDate
              // var datestamp = new Date(timestamp)
              // console.log( datestamp, 'return game data app.dashboardController.js')

          })
      }
    })



  dCtrl.fetchPatientRecord = function(patient) {
    // var gameUserLog = dCtrl.thePatients[id]

    console.log('you called function', patient._id)
    $http.get('/api/v1/gamelogs/' + patient._id)
      .then(function(returnGameData) {
        dCtrl.theGameLog = returnGameData.data
        console.log(dCtrl.theGameLog, 'return game data app.dashboardController.js')

      })
  }


}
