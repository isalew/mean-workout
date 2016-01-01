angular.module('appRoutes',[])
.config([
  '$stateProvider','$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '../views/home.html'
    }).
    state('exercises',{
      url: '/exercises',
      templateUrl: '../views/exercises.html',
      controller: 'ExerciseCtrl',
      resolve: {
        exercisePromise: ['exercises',function(exercises){
          return exercises.getAll();
        }]
      }
    }).
    state('workouts',{
      url: '/workouts',
      templateUrl: '../views/workouts.html',
      controller: 'WorkoutCtrl',
      resolve: {
        workoutPromise: ['workouts',function(workouts){
          return workouts.getAll();
        }],
        exercisePromise: ['exercises',function(exercises){
          return exercises.getAll();
        }]
      }
    }).
    state('sessions',{
      url: '/sessions',
      templateUrl: '../views/sessions.html',
      controller: 'SessionCtrl'
    });
    $urlRouterProvider.otherwise('sessions');
  }
]);
