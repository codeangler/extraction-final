// app.userController.js
angular.module('extractionApp')
  .controller('usersController', usersCtrl)

usersCtrl.$inject = ['$http', '$state']

function usersCtrl($http, $state) {
  var uCtrl = this;

  uCtrl.newUser = {
    role: "user"
  }

  uCtrl.login = function() {
    $http.post('/login', uCtrl.userMonkey)
      .then(function(returnData) {
        if (returnData.data.success) {
          console.log('you checked a username & password with passport.js')
          $('#loginModal').modal('hide');
          uCtrl.user = {

          }
          $state.go('dashboard')
        }
      })
  }

  uCtrl.createUser = function() {
    $http.post('/api/v1/users', uCtrl.newUser)
      .then(function(returnData) {
        // Reset form
        uCtrl.newUser = {}
        console.log('you created a user from Angularjs uCtrl')
          // closes sign up modal
        $('#loginModal').modal('hide');
        // redirects to state dashboard
        $state.go('dashboard')
      })
  }
}
