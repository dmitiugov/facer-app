angular.module('flapperNews').controller('newArtistCtrl', [
    '$scope',
    'artists',
    'Auth',
    'Upload',
    function($scope, artists, Auth, Upload){
        $scope.flash = ''
        $scope.title = 'Добавить артиста'
        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.user_name = user.username;
        }, function(error) {
            // unauthenticated error
        });
        $scope.upload = function (file) {
            $scope.upload = Upload.upload({
                url: '/artists.json',
                method: 'POST',
                fields: { 'user[name]': $scope.user_name, name: $scope.name, description: $scope.description, bio: $scope.bio, soundcloud: $scope.soundcloud, bandcamp: $scope.bandcamp},
                file: file,
                fileFormDataName: 'user[image]'
            });
        }
        $scope.addArtist = function(){
            if ($scope.file) {
                //console.log($scope.file)
                $scope.upload($scope.file);
            } else {
                $scope.file = '/system/special_guests/20151012_561baed03a54e.jpg'
                console.log($scope.file)
                $scope.upload($scope.file);
            }
            $scope.name = '';
            $scope.description = '';
            $scope.bio = '';
            $scope.bandcamp = '';
            $scope.soundcloud = '';
            $scope.flash = 'Artist добавлен';

        };
    }])