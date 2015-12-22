(function(){
  var app = angular.module('meanWorkout',['ui.router']);
/*
  app.config([
    '$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
      $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '',
        controller: 'MainCtrl'
      })
      .state();
      $urlRouterProvider.otherwise('home');
    }
  ]);
*/
  app.controller('MainCtrl',[
    '$scope',
    function($scope){
      $scope.title = 'MEAN Workout';
      $scope.keys = ['name','description','category'];
      $scope.exercises = [
        {
          "_id": "566de3316ed7e3a266ee5b65",
          "updated_at": "2015-12-13T21:29:21.000Z",
          "created_at": "2015-12-13T21:29:21.000Z",
          "name": "Push-Up",
          "description": "A Basic Push-Up",
          "category": "Core",
          "__v": 0
        },
        {
          "_id": "566de3316ed7e3a266ee5b65",
          "updated_at": "2015-12-13T21:29:21.000Z",
          "created_at": "2015-12-13T21:29:21.000Z",
          "name": "Crunch",
          "description": "A Basic Crunch",
          "category": "Core",
          "__v": 0
        },
        {
          "_id": "566de3316ed7e3a266ee5b65",
          "updated_at": "2015-12-13T21:29:21.000Z",
          "created_at": "2015-12-13T21:29:21.000Z",
          "name": "Pull-Up",
          "description": "A Basic Pull-Up",
          "category": "Back",
          "__v": 0
        }
      ];
      $scope.addExercise = function(){
        $scope.exercises.push({
          "_id": "566de3316ed7e3a266ee5b65",
          "updated_at": "2015-12-13T21:29:21.000Z",
          "created_at": "2015-12-13T21:29:21.000Z",
          "name": "New Exercises",
          "description": "A Basic Exercise",
          "category": "Full",
          "__v": 0
        });
      };
    }
  ]);

})();
