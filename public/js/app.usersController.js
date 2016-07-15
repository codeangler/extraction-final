(function(){// app.userController.js
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
          console.log('this is login'  , returnData)
          uCtrl.user = {}

          $state.go('dashboard', {id : returnData.data.user._id})
        }
      })
  }

  uCtrl.createUser = function() {
    $http.post('/api/v1/users', uCtrl.newUser)
      .then(function(returnData) {
                
        // closes sign up modal
        $('#loginModal').modal('hide');
        // Reset form
        uCtrl.newUser = {}
        // redirects to state dashboard
        $state.go('dashboard', {id : returnData.data.user._id})
      })
  }
}
}());