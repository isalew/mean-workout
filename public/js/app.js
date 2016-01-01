/*
Resources
[Proper routing with ui-router](http://stackoverflow.com/questions/27107691/how-should-i-create-the-path-of-templateurl-property-in-angular-ui-router)
*/
(function(){
  var app = angular.module('meanWorkout',[
    'ui.bootstrap','ui.router','ui.calendar',
    'ExerciseCtrl','WorkoutCtrl','SessionCtrl',
    'ExerciseService','WorkoutService',
    'menuDirective',
    'appRoutes'
  ]);

})();
