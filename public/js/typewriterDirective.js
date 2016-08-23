(function () {

angular.module('extractionApp').directive('typeText', function function_name(argument) {
  return {
    template: '<div>{{typewriter.text}}</div>',
    restrict: 'E',
    templateNamespace: 'html',
    controllerAs: 'typewriter',
    scope: {
      commandingText: "=commandingText"
    },
    controller: function($scope, $element, $attrs, ExtractionFactory) { 
      

    },
    link: function link(scope, ele, attrs) {
      
    }
  }
}
})()