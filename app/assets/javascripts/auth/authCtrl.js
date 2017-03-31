angular.module('flapperNews')
    .factory('fetchUsers', [
        '$http', 'toastr', function ($http, toastr) {
            var o = {};
            o.addAccauntToUser = function(user) {
                console.log(user);
                return $http.post('/accaunts/add_accaunt_to_user.json', user).success(function(data){
                    return data
                });
            };
            return o;
        }
    ])
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
    'toastr',
    '$http',
    'Upload',
    'fetchUsers',
function($scope, $state, Auth, toastr, $http, Upload, fetchUsers){
    //console.log(Upload);
    console.log(fetchUsers);
    $scope.upload = function (file, id) {
        $scope.upload = Upload.upload({
            url: '/files/add_file_to_user.json',
            method: 'POST',
            fields: {
                id: id,
                file: file,
                fileFormDataName: 'user[image]'},
        }).then(function (resp) {
            toastr.success(resp.data.name + resp.data.surname + ' created')
            $state.go('home');
        });
    }
    $scope.file = '';

    $scope.refreshAccaunts = function() {
        return $http.get(
            '/accaunts.json'
        ).then(function(response) {
            $scope.accaunts = response.data;
            console.log($scope.accaunts)
        });
    };
    $scope.refreshAccaunts();
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
      $scope.user.accaunt = $scope.accaunts.selected;
      $scope.user.file = $scope.file
    Auth.register($scope.user).then(function(response){
        fetchUsers.addAccauntToUser({
            user_id: response.id,
            accaunt: $scope.user.accaunt.id,
        }).then(function(response){
            console.log(response)
            var id = response.data.id
            if ($scope.user.file) {
                $scope.upload($scope.user.file, id);
            } else {
                $state.go('home');
            }
        })

    }, function (error) {
        console.log(error);
        toastr.error(error.data.errors)
    });
  };
}]);