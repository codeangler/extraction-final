(function() { // app.gameLogController.js
  angular.module('extractionApp')
    .factory('GameLogFactory', gameLog)

  gameLog.$inject = ['$http', '$state', 'ExtractionFactory']

  // newGameLog()  to POST to MongoDB
  function gameLog($http, $state, ExtractionFactory) {

    var gLog = this;

    factoryGameLog = function() {
      var fLog = factoryGameRecord.gameRecord

      if (fLog.sud17) {
        console.log('if  app.factory.gameLog', gLog.logUpdate)

        gLog.logUpdate.gameEndDate = fLog.currentTime17

        $http.post('/api/v1/gamelogs', gLog.logUpdate)
          .then(function(returnData) {
            console.log('findByIdAndUpdate', gLog.logUpdate)
              // redirects to state dashboard
              // $state.go('dashboard', { id: returnData.data.user._id })
          })

      } else {

        gLog.logUpdate = {
          gameName: 'panic',
          gameComplete: false,
          gameDate: fLog.currentTime1, // This needs to be a number for calendar
        }
        console.log('initialize log for post incomplete:', gLog.logUpdate)

        $http.post('/api/v1/gamelogs', gLog.logUpdate)
          .then(function(returnData) {
            console.log('return data from sever', returnData)
            
            // returnData from a already signed-in user will have different response
            if (returnData.data._id) {
              gLog.logUpdate._id = returnData.data._id
            }
            else{
              let temp = returnData.data
              gLog.logUpdate._id = temp.upsertGameLog._id
              // gLog.logUpdate._id = returnData.data.upsertGameLog[_id]
            }
            gLog.logUpdate.gameComplete = true
            console.log('modify frontend gamelog ', gLog.logUpdate)

            // redirects to state dashboard
            // $state.go('dashboard', { id: returnData.data.user._id })
          })
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
