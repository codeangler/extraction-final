//app.userDashboard.controller.js
angular.module('extractionApp')
  .controller('dashboardController', dCtrl)

dCtrl.$inject = ['$http', '$stateParams', 'GameLogFactory']

function dCtrl($http, $stateParams, GameLogFactory) {
  var dCtrl = this;
  ///////////////   POST & GET  user and game records   \\\\\\\\\\\\\\\\\\\\\
  $http.get('/api/v1/users/' + $stateParams.id)
    .then(function(returnData) {
      // console.log(returnData, 'at app.dashboardController')
      dCtrl.theUser = returnData.data.user
            dCtrl.thePatients = returnData.data.patients
      if (GameLogFactory.userWasLoggedIn === false) {
        
        GameLogFactory.logUpdate.gameUser = dCtrl.theUser._id;
        $http.post('api/v1/gamelogs', GameLogFactory.logUpdate)
          .then(function(returnData) {
            //  Patient log-in request for game records
            $http.get('/api/v1/gamelogs/' + $stateParams.id)
              .then(function(returnGameData) {
                
                dCtrl.theGameLog = returnGameData.data
                  for (let i = 0; i < dCtrl.theGameLog.length; i++) {
              let temp = {

                title: dCtrl.theGameLog[i].gameName.replace(/\b[a-z]/g, function(f) {
                  return f.toUpperCase(); }),
                type: 'info',
                startsAt: new Date(dCtrl.theGameLog[i].gameDate),
                //endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                draggable: false,
                resizable: false
              }
              dCtrl.events.push(temp)

            }
              })
          })
      } else {
        //  Patient log-in request for game records
        $http.get('/api/v1/gamelogs/' + $stateParams.id)
          .then(function(returnGameData) {
            dCtrl.theGameLog = returnGameData.data
            for (let i = 0; i < dCtrl.theGameLog.length; i++) {
              let temp = {

                title: dCtrl.theGameLog[i].gameName.replace(/\b[a-z]/g, function(f) {
                  return f.toUpperCase(); }),
                type: 'info',
                startsAt: new Date(dCtrl.theGameLog[i].gameDate),
                //endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                draggable: false,
                resizable: false
              }
              dCtrl.events.push(temp)

            }

          })
      }
    })


  dCtrl.fetchPatientRecord = function(patient) {
    // var gameUserLog = dCtrl.thePatients[id]

    console.log('you called function', patient._id)
    $http.get('/api/v1/gamelogs/' + patient._id)
      .then(function(returnGameData) {
        dCtrl.theGameLog = returnGameData.data
        dCtrl.events = [ ]
        // console.log(dCtrl.theGameLog, 'return game data app.dashboardController.js')
        for (let i = 0; i < dCtrl.theGameLog.length; i++) {
              let temp = {

                title: dCtrl.theGameLog[i].gameName.replace(/\b[a-z]/g, function(f) {
                  return f.toUpperCase(); }),
                type: 'info',
                startsAt: new Date(dCtrl.theGameLog[i].gameDate),
                //endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                draggable: false,
                resizable: false
              }
              dCtrl.events.push(temp)

            }

      })
  }

  ///////////////////    ####  CALENDAR   ######/////////////////

  //These variables MUST be set as a minimum for the calendar to work
  dCtrl.calendarView = 'month';
  dCtrl.viewDate = new Date();

  dCtrl.events = []
    // dCtrl.events = [
    //   {
    //     title: 'An event',
    //     type: 'warning',
    //     startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
    //     endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
    //     draggable: true,
    //     resizable: true
    //   }, {
    //     title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
    //     type: 'info',
    //     startsAt: moment().subtract(1, 'day').toDate(),
    //     endsAt: moment().add(5, 'days').toDate(),
    //     draggable: true,
    //     resizable: true
    //   }, {
    //     title: 'This is a really long event title that occurs on every year',
    //     type: 'important',
    //     startsAt: moment().startOf('day').add(7, 'hours').toDate(),
    //     endsAt: moment().startOf('day').add(19, 'hours').toDate(),
    //     recursOn: 'year',
    //     draggable: true,
    //     resizable: true
    //   }
    // ];

  dCtrl.isCellOpen = false;

  dCtrl.eventClicked = function(event) {
    alert.show('Clicked', event);
  };

  dCtrl.eventEdited = function(event) {
    alert.show('Edited', event);
  };

  dCtrl.eventDeleted = function(event) {
    alert.show('Deleted', event);
  };

  dCtrl.eventTimesChanged = function(event) {
    alert.show('Dropped or resized', event);
  };

  dCtrl.toggle = function($event, field, event) {
    $event.preventDefault();
    $event.stopPropagation();
    event[field] = !event[field];
  };

}
