/*
Resources
[Proper routing with ui-router](http://stackoverflow.com/questions/27107691/how-should-i-create-the-path-of-templateurl-property-in-angular-ui-router)
*/
(function(){
  var app = angular.module('meanWorkout',['ui.router']);

  app.config([
    '$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
      $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '../views/home.html',
        controller: 'MainCtrl'
      }).
      state('exercises',{
        url: '/exercises',
        templateUrl: '../views/exercises.html',
        controller: 'MainCtrl'
      });
      $urlRouterProvider.otherwise('home');
    }
  ]);

  app.controller('MainCtrl',[
    '$scope', 'exercises',
    function($scope,exercises){

      $scope.title = 'MEAN Workout';

      $scope.keys = ['name','description','category'];

      $scope.exercises = exercises.exercises;

      $scope.addExercise = function(){

        if(!$scope.name || !$scope.description || !$scope.category){
          return;
        }

        $scope.exercises.push({
          "name": $scope.name,
          "description": $scope.description,
          "category": $scope.category,
          "__v": 0
        });

        $scope.name = '';
        $scope.description = '';
        $scope.category = '';

        $scope.hideForm();

      };

      $scope.showForm = function(){
        $scope.isFormVisible = true;
      };
      $scope.hideForm = function(){
        $scope.isFormVisible = false;
      };

    }

  ]);
/*
  app.pcontroller('ExerciseCtrl',[
    '$scope','$stateParams','exercises',
    function($scope,$stateParams,exercises){

    }
  ]);
*/


  app.factory('exercises',[function(){
    //Service Body
    var o = {
      exercises: [
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
      ]
    };
    return o;
  }]);

})();
