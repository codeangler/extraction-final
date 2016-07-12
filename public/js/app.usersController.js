// app.userController.js
angular.module('extractionApp')
  .controller('usersController', usersCtrl)

usersCtrl.$inject = ['$http', '$state']

function usersCtrl($http, $state) {
  var uCtrl = this;

  uCtrl.newUser = {
    role: "user"
  }

  uCtrl.createUser = function() {

    $http.post('/api/v1/users', uCtrl.newUser)
      .then(function(returnData) {
        // Reset form

        uCtrl.newUser = {}
        console.log('you created a user from Angularjs uCtrl')
        $('#loginModal').modal('hide');
        $state.go('dashboard')
      })
  }
}
