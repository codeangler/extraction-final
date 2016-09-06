// Typewriter.controller.js
// Typewriter.controller.js 
(function() {
"use strict";
// Set up the controller
angular.module('extractionApp')
  .controller('typewriterController', tCtrl);

// Inject dependencies
tCtrl.$inject = ['$scope'];

// Controller
function tCtrl($scope) {
    var tCtrl = this;
    tCtrl.officerStatements = "Hi this is your commanding officer stuck in a directive. help me please!?!?!?!"

    // Typewriter effect using setInterval() to effect {{bound.text}}  | clearInterval()
    function typewriter() {
      var localContent = tCtrl.officerStatements;
      tCtrl.officerTypewriter = "";

      var k = 0;

      var typewriterTimer = setInterval(function() {
        if (k < localContent.length) {
          tCtrl.officerTypewriter += localContent[k]
          k++;
          $scope.$apply();
        }
      }, 100);
    }


    typewriter(); 
  }
})();