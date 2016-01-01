angular.module('appRoutes',[])
.config([
  '$stateProvider','$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '../views/home.view.html'
    }).
    state('exercises',{
      url: '/exercises',
      templateUrl: '../views/exercise-list.view.html',
      controller: 'ExerciseCtrl',
      resolve: {
        exercisePromise: ['exercises',function(exercises){
          return exercises.getAll();
        }]
      }
    }).
    state('workouts',{
      url: '/workouts',
      templateUrl: '../views/workout-list.view.html',
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
      templateUrl: '../views/session-list.view.html',
      controller: 'SessionCtrl'
    });
    $urlRouterProvider.otherwise('sessions');
  }
]);
