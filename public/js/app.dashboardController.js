//app.userDashboard.controller.js
angular.module('extractionApp')
  .controller('dashboardController', dCtrl)

dCtrl.$inject = ['$http', '$stateParams']

function dCtrl($http, $stateParams) {
  var dCtrl = this;
  $http.get('/api/v1/users/' + $stateParams.id)
    .then(function(returnData) {
      // console.log(returnData, 'at app.dashboardController')
      dCtrl.theUser = returnData.data.user
      dCtrl.thePatients = returnData.data.patients
      console.log('app.dashboardController', returnData)
        // if (dCtrl.theUser.role === "user") {
        //   console.log('this user is in app.dashboardController')
        // }
    })

//  Patient log-in request for game records
  $http.get('/api/v1/gamelogs/' + $stateParams.id)
    .then(function(returnGameData) {
      dCtrl.theGameLog = returnGameData.data
      // var timestamp = dCtrl.theGameLog[0].gameDate
      // var datestamp = new Date(timestamp)
      // console.log( datestamp, 'return game data app.dashboardController.js')

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
