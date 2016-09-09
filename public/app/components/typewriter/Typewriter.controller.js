// Typewriter.controller.js
(function() {
  "use strict";
  // Set up the controller
  angular.module('extractionApp')
    .controller('typewriterController', tCtrl);

  // Inject dependencies
  tCtrl.$inject = ['$scope', 'typewriterService', '$stateParams'];

  // Controller
  function tCtrl($scope, typewriterService, $stateParams) {
    console.log($stateParams.id)
    const tCtrl = this;
    tCtrl.officerStatements = typewriterService.getMessage("touch")[0]
    let typewriterTimer;
    clearInterval(typewriterTimer); 
    // TODO: hoisting issue with clearInterval()
    // Typewriter effect using setInterval() to effect {{bound.text}}  | clearInterval()
    function typewriter() {
      console.log(tCtrl.officerStatements)
      const localContent = tCtrl.officerStatements;
      tCtrl.officerTypewriter = "";
      let k = 0;

      typewriterTimer = setInterval(function() {
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
