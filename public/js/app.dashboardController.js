//app.userDashboard.controller.js
angular.module('extractionApp')
  .controller('dashboardController', dCtrl)

dCtrl.$inject = ['$http', '$stateParams']

function dCtrl($http, $stateParams) {
  var dCtrl = this;
  $http.get('/api/v1/users/' + $stateParams.id)
  
    .then(function(returnData) {
      // console.log(returnData, 'at app.dashboardController')
      dCtrl.theUser = returnData.data
      if(dCtrl.theUser.role === 'clinician'){
        // $http.get('/api/v1/users/')
        console.log('you are a clinician')
      }

    })
  $http.get('/api/v1/gamelogs/' + $stateParams.id)
    .then(function(returnGameData) {
      console.log(returnGameData, 'app.dashboardController')
        console.log($stateParams.id, 'app.dashboardController')

      dCtrl.theGameLog = returnGameData.data
    })


}
