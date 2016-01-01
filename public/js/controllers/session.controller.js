angular.module('SessionCtrl',[])
.controller('SessionCtrl',[
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
