angular.module('navBarDirective',[])
.directive('navBar',function(){

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
    templateUrl: '../views/menu.html',
    controller: controller,
    controllerAs: 'navBar'
  };

});
