(function() {
  angular.module("extractionApp")
    .controller('panicCtrl', panicController)

  panicController.$inject = ['ExtractionFactory', 'GameLogFactory', '$scope', '$state'];

  // function that runs the "I-AWARE INTERVENTION GAME" Panic Control
  function panicController(ExtractionFactory, GameLogFactory, $scope, $state) {
    var pCtrl = this;
    // var i = 0; // myCount() works to update iterations throughout controller
    pCtrl.responseCounter = [5, 4, 3, 2, 1]
    pCtrl.gameRecord = [];
    pCtrl.someFunction = function(){
      console.log('someFunction')
    }
    pCtrl.response = "";
    pCtrl.passFactoryGameRecord = factoryGameRecord;
    pCtrl.currentRank = currentRank[0]


    // Return the change in SUD Rating from beginning to end
    ratingChangeFunc = function(factoryGameRecord) {
      pCtrl.ratingChange = (Number(factoryGameRecord.gameRecord.sud1) - Number(factoryGameRecord.gameRecord.sud17))
    }

    //  Calculate the difference from the beginning of the game and end of the game.
    var timeFunction = function(factoryGameRecord) {
      console.log("you are in the time function", 'beginning time ' + factoryGameRecord.gameRecord.currentDate1, 'ending time ' + factoryGameRecord.gameRecord.currentDate17)
      var duration = (factoryGameRecord.gameRecord.currentDate16 - factoryGameRecord.gameRecord.currentDate1)
      msToTime(duration)
    }

    function msToTime(duration) {
      console.log('inside msToTime')
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      pCtrl.timeElasped = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      console.log('pCtrl.timeElasped inside function ', pCtrl.timeElasped)
    }

    // SUD Rating + currentDate at that moment of selection
    pCtrl.submitRating = function(event) {
      var rating = Number(event.target.id);
      var currentDate = new Date();
      var currentTime = Date.now();
      var justDate = currentDate.toDateString();
      var stringDate = currentDate.toString();
      // .push(rating &  currentDate) to gameRecord Array
      // alternative syntax that needs spefic iteration pCtrl.gameRecord.push({sud: rating, currentDate: currentDate})
      pCtrl.gameRecord["sud" + factoryIterator] = rating;
      pCtrl.gameRecord["currentTime" + factoryIterator] = currentTime;
      pCtrl.gameRecord["currentDate" + factoryIterator] = currentDate;
      pCtrl.gameRecord["toDateString" + factoryIterator] = justDate;
      pCtrl.gameRecord["stringDate" + factoryIterator] = stringDate;
      myCount();
      pCtrl.stepThroughIterator(factoryIterator);
      factoryGameRecord.gameRecord = pCtrl.gameRecord
        // POST to 
      GameLogFactory.factoryGameLog();
    }

    pCtrl.submitResponse = function(e) {
      var currentDate = new Date();
      var currentTime = Date.now();
      var stringDate = currentDate.toString();
      pCtrl.gameRecord["response" + factoryIterator] = pCtrl.response;
      pCtrl.gameRecord["currentTime" + factoryIterator] = currentTime;
      pCtrl.gameRecord["currentDate" + factoryIterator] = currentDate;
      pCtrl.gameRecord["stringDate" + factoryIterator] = stringDate;
      pCtrl.response = "";

      // mobile testing alert
      // alert('response from submission in a text input ' + pCtrl.gameRecord["response" + i])
      myCount();
      pCtrl.stepThroughIterator(factoryIterator);
      factoryGameRecord.gameRecord = pCtrl.gameRecord
      factoryIterator = factoryIterator;

      // Swap ui-sref="game-report" w/n panicGame.rating 
      ratingSrefSwap()
      ratingAgainState(factoryIterator);
    }

    // Access Commanding Officer statements stored as arrays within object found in app.extraction-factory.js
    pCtrl.stepThroughIterator = function(factoryIterator) {

        if (factoryIterator == 0) {
          myCount();
          pCtrl.officerStatements = commandingOfficer.initialHome[0]
          typewriter();
        } else if (factoryIterator == 1) {
          pCtrl.officerStatements = commandingOfficer.sud[1]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (factoryIterator == 2) {
          // sight
          pCtrl.currentSense = "Sights";
          pCtrl.officerStatements = commandingOfficer.sight[0];
          clearInterval(typewriterTimer);
          typewriter();
        } else if (factoryIterator == 7) {
          // touch
          pCtrl.currentSense = "Textures";
          pCtrl.officerStatements = commandingOfficer.touch[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (factoryIterator == 11) {
          // sound
          pCtrl.currentSense = "Sounds";
          pCtrl.officerStatements = commandingOfficer.sound[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (factoryIterator == 14) {
          // smell
          pCtrl.currentSense = "Smells";
          pCtrl.officerStatements = commandingOfficer.smell[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (factoryIterator == 16) {
          // taste
          pCtrl.currentSense = "Taste";
          pCtrl.officerStatements = commandingOfficer.taste[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (factoryIterator == 17) {
          // Announce Mission Complete Get Another Sud Reading 
          pCtrl.officerStatements = commandingOfficer.sud[0]
          clearInterval(typewriterTimer);
          typewriter();
          timeFunction(factoryGameRecord);

        } else if (factoryIterator == 18) {
          // Announce Mission Complete Get Another Sud Reading 
          pCtrl.officerStatements = commandingOfficer.mission[0]
          clearInterval(typewriterTimer);
          typewriter();
          ratingChangeFunc(factoryGameRecord);
        }
      }
      // initial call of pCtrl.stepThroughIterator(i=0)
    pCtrl.stepThroughIterator(factoryIterator);

    // establish function myCount() to interate throughout the controller
    function myCount() { factoryIterator++; }

    // Typewriter effect using setInterval() to effect {{bound.text}}  | clearInterval()
    function typewriter() {
      var localContent = pCtrl.officerStatements;
      pCtrl.officerTypewriter = "";

      var k = 0;

      typewriterTimer = setInterval(function() {
        if (k < localContent.length) {
          pCtrl.officerTypewriter += localContent[k]
          k++;
          $scope.$apply();
        }
      }, 100);
    }

    // Clear all objects upon load of homescreen
    function clearObjects(){
      console.log(factoryIterator, 'FI')
      factoryIterator = 0;
      console.log(factoryIterator, 'FI')
    }

    // Set ui-sref w/n panic-rating.html dependent on value of i 
    pCtrl.ratingSref = "panicGame.intervention";

    function ratingSrefSwap() {
      pCtrl.ratingSref = 'panicRecord';
    }

    ratingAgainState = function(i) {
      // After completing all steps of intervention return to SUD rating 
      if (factoryIterator == 17) {
        $state.go("panicGame.rating")
      }
    }

  }
}());
