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
    const tCtrl = this;
    tCtrl.officerStatements = "Hi this is your commanding officer stuck in a directive. help me please!?!?!?!"
    // clearInterval(typewriterTimer);  TODO: hoisting issue with clearInterval()

    // Typewriter effect using setInterval() to effect {{bound.text}}  | clearInterval()
    function typewriter() {
      const localContent = tCtrl.officerStatements;
      tCtrl.officerTypewriter = "";
      let k = 0;

      const typewriterTimer = setInterval(function() {
        if (k < localContent.length) {
          tCtrl.officerTypewriter += localContent[k]
          k++;
          $scope.$apply();
        }
      }, 100);
    };

    
    typewriter();
  }
})();
