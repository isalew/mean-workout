/*
Resources
[Proper routing with ui-router](http://stackoverflow.com/questions/27107691/how-should-i-create-the-path-of-templateurl-property-in-angular-ui-router)
*/
(function(){
  var app = angular.module('meanWorkout',['ui.bootstrap','ui.router']);

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

  app.controller('WorkoutCtrl',[
    '$scope','$http','workouts','exercises',
    function($scope,$http,workouts,exercises){
      $scope.objectName = 'Workout';
      $scope.workouts = workouts.workouts;
      $scope.keys = ['name','description'];
      $scope.exerciseKeys = ['exercise','description','category'];
      $scope.exercises = exercises.exercises;
      //$scope.exercises = ['pull-up','push-up','crunch'];
      $scope.selected = undefined;
/*
      // Any function returning a promise object can be used to load values asynchronously
      $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: val,
            sensor: false
          }
        }).then(function(response){
          return response.data.results.map(function(item){
            return item.formatted_address;
          });
        });
      };
*/
    }
  ]);
  app.controller('ExerciseCtrl',[
    '$scope', 'exercises',
    function($scope,exercises){

      $scope.objectName = 'Exercise';
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
      //TODO:50 Exercise: Add edit function & form to exercises
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

  app.factory('workouts',['$http',function($http){
    var o = {
      workouts: []
    };
    o.getAll = function(){
      return $http.get('/api/workouts').success(function(data){
        angular.copy(data, o.workouts);
      });
    };
    o.create = function(workout){
      return $http.post('/api/workouts',workout).success(function(data){
        o.workouts.push(data);
      });
    }
    return o;
  }]);

  app.factory('exercises',['$http',function($http){
    var o = {
      exercises: [
        /*
          //Optionally bypass database with test data
          {
            "_id": "566de3316ed7e3a266ee5b65",
            "updated_at": "2015-12-13T21:29:21.000Z",
            "created_at": "2015-12-13T21:29:21.000Z",
            "name": "Push-Up",
            "description": "A Basic Push-Up",
            "category": "Core",
            "__v": 0
          }
        */
      ]
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

})();
