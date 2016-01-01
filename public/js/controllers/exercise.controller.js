angular.module('ExerciseCtrl',[])
.controller('ExerciseCtrl',[
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
    //TODO: Exercise: Update exercise
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
