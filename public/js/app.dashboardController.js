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

      if (dCtrl.theUser.role === "user") {
        console.log('this user is in app.dashboardController')
      }
    })


  $http.get('/api/v1/gamelogs/' + $stateParams.id)
    .then(function(returnGameData) {
      console.log(returnGameData.data)
      dCtrl.theGameLog = returnGameData.data
    })

  dCtrl.fetchPatientRecord = function(patient) {
    // var gameUserLog = dCtrl.thePatients[id]

    console.log('you called function', patient._id)
    $http.get('/api/v1/gamelogs/' + patient._id)
      .then(function(returnGameData) {
        console.log(returnGameData.data, 'return game data app.dashboardController.js')
        dCtrl.theGameLog = returnGameData.data
      })
  }


}
