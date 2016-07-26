(function() {
  angular.module("extractionApp")
    .controller('panicCtrl', panicController)

  panicController.$inject = ['ExtractionFactory', 'GameLogFactory', '$scope', '$state'];

  // function that runs the "I-AWARE INTERVENTION GAME" Panic Control
  function panicController(ExtractionFactory, GameLogFactory, $scope, $state) {
    var pCtrl = this;
    // var i = 0; // myCount() works to update iterations throughout controller
    let iterator = ExtractionFactory.factoryIterator;
    pCtrl.gameRecord = [];
    pCtrl.response = "";
    pCtrl.passFactoryGameRecord = factoryGameRecord;
    pCtrl.currentRank = ExtractionFactory.currentRank[0]
    let responseCounter = [false, false, false, false, false]
    pCtrl.responseCounter = responseCounter;
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
      pCtrl.gameRecord["sud" + iterator] = rating;
      pCtrl.gameRecord["currentTime" + iterator] = currentTime;
      pCtrl.gameRecord["currentDate" + iterator] = currentDate;
      pCtrl.gameRecord["toDateString" + iterator] = justDate;
      pCtrl.gameRecord["stringDate" + iterator] = stringDate;
      myCount();
      pCtrl.stepThroughIterator(iterator);
      factoryGameRecord.gameRecord = pCtrl.gameRecord
        // POST to 
      GameLogFactory.factoryGameLog();
    }

    let responseCounterFunc = function() {
      let length = pCtrl.responseCounter.length
      for(let i = 0 ; i < pCtrl.responseCounter.length; i++){
        if(pCtrl.responseCounter[i] === false){
          return pCtrl.responseCounter[i] = true;
        }
      }
      
    }

    pCtrl.submitResponse = function(e) {
      responseCounterFunc();
      var currentDate = new Date();
      var currentTime = Date.now();
      var stringDate = currentDate.toString();
      pCtrl.gameRecord["response" + iterator] = pCtrl.response;
      pCtrl.gameRecord["currentTime" + iterator] = currentTime;
      pCtrl.gameRecord["currentDate" + iterator] = currentDate;
      pCtrl.gameRecord["stringDate" + iterator] = stringDate;
      pCtrl.response = "";

      // mobile testing alert
      // alert('response from submission in a text input ' + pCtrl.gameRecord["response" + i])
      myCount();
      
      pCtrl.stepThroughIterator(iterator);
      factoryGameRecord.gameRecord = pCtrl.gameRecord
     

      // Swap ui-sref="game-report" w/n panicGame.rating 
      ratingSrefSwap()
      ratingAgainState(iterator);
    }

    function user(num) {
      num--;
    }

    // Access Commanding Officer statements stored as arrays within object found in app.extraction-factory.js
    pCtrl.stepThroughIterator = function(iterator) {

        if (iterator == 0) {
          myCount();
          pCtrl.officerStatements = ExtractionFactory.co.initialHome[0]
          typewriter();
        } else if (iterator == 1) {
          pCtrl.officerStatements = ExtractionFactory.co.sud[1]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (iterator == 2) {
          // sight
          pCtrl.currentSense = "Sights";
          pCtrl.officerStatements = ExtractionFactory.co.sight[0];
          clearInterval(typewriterTimer);
          typewriter();

        } else if (iterator == 7) {
          // touch
          pCtrl.responseCounter = [false, false, false, false]
          pCtrl.currentSense = "Textures";
          pCtrl.officerStatements = ExtractionFactory.co.touch[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (iterator == 11) {
          // sound
          pCtrl.responseCounter = [false, false, false]
          pCtrl.currentSense = "Sounds";
          pCtrl.officerStatements = ExtractionFactory.co.sound[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (iterator == 14) {
          // smell
          pCtrl.responseCounter = [false, false]
          pCtrl.currentSense = "Smells";
          pCtrl.officerStatements = ExtractionFactory.co.smell[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (iterator == 16) {
          // taste
          pCtrl.responseCounter = [false]
          pCtrl.currentSense = "Taste";
          pCtrl.officerStatements = ExtractionFactory.co.taste[0]
          clearInterval(typewriterTimer);
          typewriter();
        } else if (iterator == 17) {
          // Announce Mission Complete Get Another Sud Reading 
          pCtrl.officerStatements = ExtractionFactory.co.sud[0]
          clearInterval(typewriterTimer);
          typewriter();
          timeFunction(factoryGameRecord);

        } else if (iterator == 18) {
          // Announce Mission Complete Get Another Sud Reading 
          pCtrl.officerStatements = ExtractionFactory.co.mission[0]
          clearInterval(typewriterTimer);
          typewriter();
          ratingChangeFunc(factoryGameRecord);
        }
      }
      // initial call of pCtrl.stepThroughIterator(i=0)
    pCtrl.stepThroughIterator(iterator);

    // establish function myCount() to interate throughout the controller
    function myCount() { iterator++; }

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
    function clearObjects() {
      console.log(iterator, 'FI')
      iterator = 0;
      console.log(iterator, 'FI')
    }

    // Set ui-sref w/n panic-rating.html dependent on value of i 
    pCtrl.ratingSref = "panicGame.intervention";

    function ratingSrefSwap() {
      pCtrl.ratingSref = 'panicRecord';
    }

    ratingAgainState = function(i) {
      // After completing all steps of intervention return to SUD rating 
      if (iterator == 17) {
        $state.go("panicGame.rating")
      }
    }

  }
}());
