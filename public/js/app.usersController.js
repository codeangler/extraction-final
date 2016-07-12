// app.userController.js
angular.module('extractionApp')
  .controller('usersController', usersCtrl)

usersCtrl.$inject = ['$http']
function usersCtrl($http){
  var uCtrl = this;

  uCtrl.newUser = {}
  uCtrl.createUser = function(){
    $http.post('/api/v1/users', uCtrl.newUser)
      .then(function (returnData) {
        // Reset form
        uCtrl.newUser = {}
        console.log('you created a user from Angularjs uCtrl')
      })
  }
}