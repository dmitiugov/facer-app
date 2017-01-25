angular.module('flapperNews').controller('editArtistCtrl', [
    '$scope',
    'artists',
    'Auth',
    'Upload',
    function($scope, artists, Auth, Upload){
        $scope.flash = ''
        $scope.title = 'Редактировать артиста'

        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.user_name = user.username;
        }, function(error) {
            // unauthenticated error
        });

        $scope.name = artists.artist.name;
        $scope.description = artists.artist.description;
        $scope.age = artists.artist.age;
        $scope.bandcamp = artists.artist.bandcamp;
        $scope.soundcloud = artists.artist.soundcloud;
        $scope.bio = artists.artist.bio;
        $scope.file = artists.artist.photo;
        console.log(artists.artist)
        $scope.addArtist = function() {


            //TODO: это нужно обернуть editFields и использовать фабрику artists
            //artists.edit({
              //  name: $scope.name,
                //description: $scope.description,
            //})

            if ($scope.file && $scope.file != '/images/missing.png' && $scope.file.$ngfBlobUrl) {
                console.log('1')
                //$scope.upload($scope.eve.file);
            } else {
                console.log('!!!')
                //$scope.editFields();

            }
        }
    }])