angular.module('flapperNews')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
    'toastr',
function($scope, $state, Auth, toastr){
  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home');
    }, function(error) {
       console.log(error.data.error)

        toastr.error(error.data.error)
    });
  };
  $scope.logout = function () {
     Auth.logout($scope.user).then(function () {
         $state.go('home');
     }, function (error) {
         toastr.error(error.data.error)
         }
     );
  };
  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home');
    }, function (error) {
        toastr.error(error.data.error)
        $scope.flash=error.data
    });
  };
  //console.log(Auth)
}]);