// Typewriter.directive.js
(function() {
  angular.module('extractionApp')
    .directive('eaTypewriter', typewriterDirective)

  function typewriterDirective() {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      scope: {
        
      },
      templateUrl: '/app/components/typewriter/typewriter.html', // path relative to index.html
      controller: 'typewriterController as tCtrl' // controllerAs: 'typewriterController'
    }
  };
})();
