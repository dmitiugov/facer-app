angular.module('flapperNews')
.controller('NavCtrl', [
'$scope',
'Auth',
    '$state',
function($scope, Auth, $state){
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;
    console.log("!!!")
  Auth.currentUser().then(function (user){
    $scope.user = user;
    console.log($scope.user);

  });

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
      $state.go('login');
  });

}]);