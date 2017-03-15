angular.module('flapperNews').controller('editArtistCtrl', [
    '$scope',
    'artists',
    'Auth',
    'Upload',
    'toastr',
    function($scope, artists, Auth, Upload, toastr){
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
        $scope.bandcamp = artists.artist.bandcamp;
        $scope.soundcloud = artists.artist.soundcloud;
        $scope.bio = artists.artist.bio;
        $scope.file = artists.artist.photo;
        $scope.id = artists.artist.id;
        console.log(artists.artist)
        $scope.editFields = function() {
            artists.edit({
                name: $scope.name,
                description: $scope.description,
                bandcamp: $scope.bandcamp,
                bio: $scope.bio,
                id: $scope.id,
            }).then(function(data){
                console.log(data)
                toastr.success(data.config.data.name + " изменен");
            })
        }
        $scope.upload = function (file) {
            console.log(file)
            $scope.upload = Upload.upload({
                url: '/artists/'+ artists.artist.id + '.json',
                method: 'PUT',
                fields: {
                    'user[name]': $scope.user_name,
                    file: file,
                    id: $scope.id
                },
            }).then(function(resp){
                console.log(resp);
                $scope.editFields()
            })
        }
        $scope.addArtist = function() {

            if ($scope.file && $scope.file != '/images/missing.png' && $scope.file.$ngfBlobUrl) {
                $scope.upload($scope.file);
            } else {
                $scope.editFields();

            }
        }
    }])