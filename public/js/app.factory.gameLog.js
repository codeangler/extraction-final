(function() { // app.gameLogController.js
  angular.module('extractionApp')
    .factory('GameLogFactory', gameLog)

  gameLog.$inject = ['$http', '$state', 'ExtractionFactory']

  // newGameLog()  to POST to MongoDB
  function gameLog($http, $state, ExtractionFactory) {
    var gFactory = this;
    // gFactory = {
    //   gameComplete: false
    // }

    factoryGameLog = function() {
      if (!factoryGameRecord.gameRecord.sud17) {
        console.log('incomplete', factoryGameRecord.gameRecord.sud17 )

      } else {
        console.log('this is complete')
      }

    }

    return {
      gamePostFunc: factoryGameLog,

    }



    // let fRecord = factoryGameRecord.gameRecord;

    // if (fRecord) {
    //   if (fRecord.sud17) {
    //     console.log('done')
    //   } else {
    //     console.log('newGamelog + fRecord', factoryGameRecord.gameRecord)
    //     // $http.post newGame
    //     g$.post('')
    //   }
    // }


    // function gameLogCtrl($http, $state) {
    //   var uCtrl = this;

    //   uCtrl.newUser = {
    //     role: "user"
    //   }

    //   uCtrl.login = function() {
    //     $http.post('/login', uCtrl.userMonkey)
    //       .then(function(returnData) {
    //         if (returnData.data.success) {
    //           console.log('you checked a username & password with passport.js')
    //           $('#loginModal').modal('hide');
    //           console.log('this is login'  , returnData)
    //           uCtrl.user = {}

    //           $state.go('dashboard', {id : returnData.data.user._id})
    //         }
    //       })
    //   }

    //   uCtrl.createUser = function() {
    //     $http.post('/api/v1/users', uCtrl.newUser)
    //       .then(function(returnData) {

    //         // closes sign up modal
    //         $('#loginModal').modal('hide');
    //         // Reset form
    //         uCtrl.newUser = {}
    //         // redirects to state dashboard
    //         $state.go('dashboard', {id : returnData.data.user._id})
    //       })
    //   }
  }
}());
