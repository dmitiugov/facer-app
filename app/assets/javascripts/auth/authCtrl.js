angular.module('flapperNews')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
    'toastr',
    'accaunt',
function($scope, $state, Auth, toastr, accaunt){

        accaunt.getAccaunt().then(function (data) {
            $scope.accaunts = data.data;
        })
    accaunt.getAccaunt().then(function (data) {
        $scope.accaunt = data.data;
    })
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
      console.log($scope.accaunts[0])


      $scope.user.accaunt = $scope.accaunts[0];

      console.log($scope.user);
    Auth.register($scope.user).then(function(response){
        console.log(response);
      $state.go('home');
    }, function (error) {
        console.log(error);
        toastr.error(error.data.errors)
    });
  };
  //console.log(Auth)
}]);