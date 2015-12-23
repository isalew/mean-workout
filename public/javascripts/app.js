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
        templateUrl: '../partials/home.html'
      }).
      state('exercises',{
        url: '/exercises',
        templateUrl: '../partials/exercises.html',
        controller: 'ExerciseCtrl',
        resolve: {
          exercisePromise: ['exercises',function(exercises){
            return exercises.getAll();
          }]
        }
      }).
      state('workouts',{
        url: '/workouts',
        templateUrl: '../partials/workouts.html',
        controller: 'WorkoutCtrl'
      }).
      state('sessions',{
        url: '/sessions',
        templateUrl: '../partials/sessions.html',
        controller: 'SessionCtrl'
      });
      $urlRouterProvider.otherwise('sessions');
    }
  ]);

  app.directive('navBar',function(){

    var controller = ['$scope',function($scope){
      $scope.title = 'MEAN Workout';
    }];

    return {
      //configuration object defining how directive will work
      restrict: 'E', //Type of Directive (E for Element)
      templateUrl: '../partials/menu.html',
      controller: controller,
      controllerAs: 'navBar'
    };

  });

  app.controller('ExerciseCtrl',[
    '$scope', 'exercises',
    function($scope,exercises){

      $scope.exercises = exercises.exercises;
      $scope.keys = ['name','category','description','actions'];
      // $scope.keys = Object.keys($scope.exercises[0]); // Pulls all key values
      $scope.formName = 'New Exercise';

      $scope.toggleForm = function(){
        if($scope.isFormVisible){
          $scope.isFormVisible = false;
        } else {
          $scope.isFormVisible = true;
        }
      };

      $scope.addExercise = function(){

        if(!$scope.name || !$scope.description || !$scope.category){
          return;
        }

        exercises.create({
          name: $scope.name,
          description: $scope.description,
          category: $scope.category
        });

        $scope.name = '';
        $scope.description = '';
        $scope.category = '';

        $scope.toggleForm();

      };
/*
      //TODO: Add edit function & form to exercises
      $scope.editExercise = function(exercise){

        $scope.formName = 'Edit Exercise';

        $scope.name = exercise.name;
        $scope.description = exercise.description;
        $scope.category = exercise.category;

        $scope.toggleForm();

      };

      $scope.saveExercise = function(exercise){
        exercises.save(exercise._id);
      }
*/
      $scope.deleteExercise = function(id){
        exercises.delete(id);
      }

    }

  ]);


  app.factory('exercises',['$http',function($http){
    var o = {
      exercises: []
    };
    o.getAll = function(){
      return $http.get('/api/exercises').success(function(data){
        angular.copy(data, o.exercises);
      });
    };
    o.get = function(id){
      return $http.get('/api/exercises/' + id).then(function(res){
        return res.data;
      });
    };
    o.create = function(exercise){
      return $http.post('/api/exercises',exercise).success(function(data){
        o.exercises.push(data);
      });
    };
    o.update = function(exercise){
      return $http.put('/api/exercises/' + exercise._id, null).success(function(data){
        exercise = exercise;
      });
    }
    o.delete = function(id){
      $http.delete('/api/exercises/' + id).then(function(res){
        for (var i = 0; i < o.exercises.length; i++){
          if (o.exercises[i]._id === id) {
             o.exercises.splice(i,1);
             break;
          }
        }
        return res.data;
      });

    }
    return o;
  }]);
/*
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
*/
})();
