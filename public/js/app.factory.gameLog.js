(function() { // app.gameLogController.js
  angular.module('extractionApp')
    .factory('GameLogFactory', gameLog)

  gameLog.$inject = ['$http', '$state', 'ExtractionFactory']

  // newGameLog()  to POST to MongoDB
  function gameLog($http, $state, ExtractionFactory) {
    var gLog = this;
    gLog.userWasLoggedIn = 6;

    gLog.factoryGameLog = function() {
      // var fLog = factoryGameRecord.gameRecord
      let fLog = ExtractionFactory.factoryGameRecord
      if (fLog.sud17) {
        console.log('if  app.factory.gameLog', gLog.logUpdate)

        gLog.logUpdate.gameEndDate = fLog.currentTime17
        gLog.logUpdate.gameComplete = true  // 

        $http.post('/api/v1/gamelogs', gLog.logUpdate)
          .then(function(returnData) {
            console.log('findByIdAndUpdate', gLog.logUpdate)
        })

      } else {

        gLog.logUpdate = {
            gameName: 'panic',
            gameComplete: false,
            gameDate: fLog.currentTime1, // This needs to be a UTM date number for calendar
          }
          // console.log('initialize log for post incomplete:', gLog.logUpdate)

        $http.post('/api/v1/gamelogs', gLog.logUpdate)
          .then(function(returnData) {
            // console.log('return data from sever', returnData)

            // returnData from a already signed-in user will have different object format
            if (returnData.data._id) {
              gLog.logUpdate._id = returnData.data._id
              gLog.userWasLoggedIn = true;
            
            } else { // returnData from gameUser not logged in
              
              let temp = returnData.data
              gLog.logUpdate._id = temp.upsertGameLog._id
              gLog.userWasLoggedIn = false;
             
            }
            
          })
          
      }

    }
    return gLog
  }
}());