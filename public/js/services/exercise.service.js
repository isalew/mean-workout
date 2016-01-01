angular.module('ExerciseService',[])
.factory('exercises',['$http',function($http){
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
