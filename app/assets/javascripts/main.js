angular.module('flapperNews').controller('headController', [
    '$scope',
    'Auth',
    '$state',
    'giphy',
    function ($scope, Auth, $state, giphy) {
        //random gif depricated yet
        /*giphy.getGiphy().then(function (data) {
         var random = Math.ceil(Math.random() * 20);
         $scope.image = 'url(https://media.giphy.com/media/' + data.data.data[random].id + '/giphy.gif)';
         console.log($scope.image);
         })*/
        //random gif depricated yet
        $scope.signedIn = Auth.isAuthenticated;
        $scope.logout = Auth.logout;
        Auth.currentUser().then(function (user){
            $scope.user = user;
            //console.log($scope.user);
            $scope.loggedIn = true

        });

        $scope.$on('devise:new-registration', function (e, user){
            $scope.user = user;
            $scope.loggedIn = true
        });

        $scope.$on('devise:login', function (e, user){
            $scope.user = user;
            $scope.loggedIn = true
        });

        $scope.$on('devise:logout', function (e, user){
            $scope.user = {};
            $state.go('login');
            $scope.loggedIn = false
        });
        $scope.loggedIn = false
    }
])