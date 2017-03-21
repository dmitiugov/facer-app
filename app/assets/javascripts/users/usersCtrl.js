angular.module('flapperNews').controller('UsersCtrl', [
    '$scope',
    'users',
    'Auth',
    function ($scope, users, Auth) {
    console.log(users.users[0]);
    $scope.user=users.users[0]
        console.log(Auth);
}])