angular.module('WorkoutsService',[])
.factory('workouts',['$http',function($http){
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
  o.update = function(workout){
    return $http.put('/api/workouts/' + workout._id, null).success(function(data){
      workout = workout;
    });
  }
  return o;
}]);
