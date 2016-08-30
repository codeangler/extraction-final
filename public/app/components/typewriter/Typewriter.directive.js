// Typewriter.directive.js
(function() {
  angular.module('extractionApp')
    .directive('myDirective', typewriterDirective)

  function typewriterDirective() {
    return {
      restrict: 'EA',
      scope: {},
      template: 'This is typewriter directive'
    }
  };
})();
