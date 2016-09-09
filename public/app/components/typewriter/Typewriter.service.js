// Typewriter.service.js
(function() {
  "use strict"

  angular.module('extractionApp')
    .service('typewriterService', function() {
      // 
      let textStatements = {
        sud: ['Report your current distress level', 'Check-in Soldier! How distressed are you presently', "hi jesse"],
        mission: ['MISSION COMPLETE! Nice work soldier.'],
        encouragement: ['Keep going', 'Nice work.', 'Take your time. Not too fast. Not too slow.'],
        sight: ['Environment Report! List five things you see around you.'],
        touch: ['Touch four surfaces and report to me their texture'],
        sound: ['Listen! Report three sounds you hear'],
        smell: ['Describe two smells in your surroundings'],
        taste: ['Finally, report one thing you can taste presently'],
        initialHome: ['Soldier: Recover your hijacked mind by completing these missions!']
      }

      function getMessage(stepName) {
        return textStatements[stepName] // verify you have a string in stepName
      }

      return {

        getMessage: getMessage // functions are first class so just pass the function name don't invoke it,

      }

    })
})();

