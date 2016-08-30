// Typewriter.directive.js
(function() {
  angular.module('extractionApp')
    .directive('eaTypewriter', typewriterDirective)

  function typewriterDirective() {
    return {
      restrict: 'A',
      scope: {},
      templateUrl: '/app/components/typewriter/typewriter.html', // path relative to index.html
    }
  };
})();
