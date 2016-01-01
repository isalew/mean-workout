angular.module('WorkoutCtrl',[])
.controller('WorkoutCtrl',[
  '$scope','workouts','exercises',
  function($scope,workouts,exercises){
    $scope.objectName = 'Workout';
    $scope.workouts = workouts.workouts;
    $scope.keys = ['name','description'];
    $scope.exerciseKeys = ['exercise','description','category'];
    $scope.exercises = exercises.exercises;
    $scope.selectedWorkout = undefined;
    $scope.selectedExercise = undefined;

    $scope.toggleForm = function(){
        $scope.isFormVisible = !$scope.isFormvisible;
    };

    $scope.addExercise = function(workout){
      $scope.selectedWorkout = workout;
      console.log('Workout: ', $scope.selectedWorkout);
      $scope.toggleForm();
    };

    $scope.onSelect = function($item,$model,$label){
      $scope.$item = $item;
      $scope.$model = $model;
      $scope.$label = $label;
      //Set Variables
      $scope.selectedExercise = $scope.$item;
      console.log('Exercise: ', $scope.selectedExercise);
      $scope.selectedWorkout.exercises.push($scope.selectedExercise);
      //Update Records
      //TODO: Workout: Create Update API to Add Exercise
      var query = {_id:$scope.selectedWorkout._id};
      var update = $scope.selectedWorkout;



      workouts.update(query,update,function(err,res){
        if(err) return handleError(err);
        console.log('The response from mongo was ', raw);
      });
    };

  }
]);
