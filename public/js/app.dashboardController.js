//app.userDashboard.controller.js
angular.module('extractionApp')
  .controller('dashboardController', dCtrl)

 dCtrl.$inject = ['$http', '$stateParams']
function dCtrl ($http, $stateParams){
    var dCtrl = this;
    
    $http.get('/api/v1/users/' + $stateParams.id)
        .then(function(returnData){
          console.log(returnData, 'at dashboardController')
            dCtrl.theUser = returnData.data
        })

}