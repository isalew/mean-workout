/*
Resources
[Proper routing with ui-router](http://stackoverflow.com/questions/27107691/how-should-i-create-the-path-of-templateurl-property-in-angular-ui-router)
*/
(function(){
  var app = angular.module('meanWorkout',['ui.bootstrap','ui.router','ui.calendar']);

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
      $scope.isCollapsed = true;
      $scope.toggleMenu = function(){
        $scope.isCollapsed = !$scope.isCollapsed;
      }
    }];

    return {
      //configuration object defining how directive will work
      restrict: 'E', //Type of Directive (E for Element)
      templateUrl: '../partials/menu.html',
      controller: controller,
      controllerAs: 'navBar'
    };

  });
  app.controller('SessionCtrl',[
    '$scope','$compile','uiCalendarConfig',
    function($scope,$compile,uiCalendarConfig){
      //TODO: Sessions: Integrate Google Calendar for Workout Schedule
      //TODO: Sessions: Replace Calendar View with Timeline View - https://github.com/rpocklin/angular-timeline

      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      /* data */
      $scope.events = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29) /* ,url: 'http://google.com/' */}
      ];

      /* actions */

      /* alert on eventClick */
      $scope.alertOnEventClick = function( date, jsEvent, view){
          console.log(date.title + ' was clicked ');
          $scope.alertMessage = (date.title + ' was clicked ');
      };
      /* alert on Drop */
       $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
         $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
      };
      /* alert on Resize */
      $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
         $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
      };
      /* add custom event*/
      $scope.addEvent = function() {
        $scope.events.push({
          title: 'Open Sesame',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          className: ['openSesame']
        });
      };
      /* remove event */
      $scope.remove = function(index) {
        $scope.events.splice(index,1);
      };
      /* Change View */
      $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };
      /* Change View */
      $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      };
      /* Render Tooltip */
      $scope.eventRender = function( event, element, view ) {
        element.attr({'uib-tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
      };

      /* config */
      $scope.uiConfig = {
        calendar:{
          // height: 450,
          editable: true,
          /*
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          */
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender
        }
      };

      $scope.eventSources = [$scope.events];

    }
  ]);
  app.controller('WorkoutCtrl',[
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
      }

      $scope.onSelect = function($item,$model,$label){
        $scope.$item = $item;
        $scope.$model = $model;
        $scope.$label = $label;
        //Set Variables
        $scope.selectedExercise = $scope.$item;
        console.log('Exercise: ', $scope.selectedExercise);
        $scope.selectedWorkout.exercises.push($scope.selectedExercise);
        //Update Records
        //TODO: Workouts: Create Update API to Add Exercise
        var query = {_id:$scope.selectedWorkout._id};
        var update = $scope.selectedWorkout;



        workouts.update(query,update,function(err,res){
          if(err) return handleError(err);
          console.log('The response from mongo was ', raw);
        });
      };
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
    o.update = function(workout){
      return $http.put('/api/workouts/' + workout._id, null).success(function(data){
        workout = workout;
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
