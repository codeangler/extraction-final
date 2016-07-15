(function() { // app.gameLogController.js
  angular.module('extractionApp')
    .factory('GameLogFactory', gameLog)

  gameLog.$inject = ['$http', '$state', 'ExtractionFactory']

  // newGameLog()  to POST to MongoDB
  function gameLog($http, $state, ExtractionFactory) {
    var gLog = this;



    factoryGameLog = function() {
      var fLog = factoryGameRecord.gameRecord
      if (!fLog.sud17) {

        gLog.logUpdate = {
          gameName: 'panic',
          gameComplete: false,
          gameDate: fLog.currentDate1,
        }
        console.log('incomplete', gLog.logUpdate)

        $http.post('/api/v1/gamelogs', gLog.logUpdate)
          .then(function(returnData) {
            console.log(returnData)
            // redirects to state dashboard
            // $state.go('dashboard', { id: returnData.data.user._id })
          })

      } else {
        // console.log('this is complete', factoryGameRecord.gameRecord)
        // $http.post('/api/v1/gamelogs', gFactory.gameUpdate)
        //   .then(function(returnData) {

        //     // redirects to state dashboard
        //     // $state.go('dashboard', { id: returnData.data.user._id })
        //   })
        console.log('else app.factory.gameLog')

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
