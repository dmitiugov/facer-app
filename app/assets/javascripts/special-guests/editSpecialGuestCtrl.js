angular.module('flapperNews').controller('editSpecialGuestCtrl', [
    '$scope',
    'special_guests',
    'Auth',
    'Upload',
    'toastr',
    '$state',
    function($scope, special_guests, Auth, Upload, toastr, $state){
        $scope.flash = ''
        $scope.title = 'Отредактировать постоянного гостя'
        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.user_name = user.username;
        }, function(error) {
            // unauthenticated error
        });
        $scope.upload = function (file, id) {
            $scope.upload = Upload.upload({
                url: '/files/add_file_to_special.json',
                method: 'POST',
                fields: {
                    id: id,
                    file: file,
                    fileFormDataName: 'user[image]'
                },
            }).then(function(resp){
                console.log(resp);
                toastr.success(resp.data.name + " изменен")
                $state.go("special_guests")
            })
        }
        $scope.name = special_guests.special_guest.name;
        $scope.surname = special_guests.special_guest.surname;
        $scope.description = special_guests.special_guest.description;
        $scope.bio = special_guests.special_guest.bio;
        $scope.file = special_guests.special_guest.file;
        $scope.age = special_guests.special_guest.age;
        $scope.id = special_guests.special_guest.id;
        $scope.addSpecialGuest = function(){
            special_guests.edit({
                name: $scope.name,
                surname: $scope.surname,
                description: $scope.description,
                bio: $scope.bio,
                id: $scope.id,
                age: $scope.age,
            }).then(function (resp) {
                console.log(resp)
                var id = resp.config.data.id
                if ($scope.file && $scope.file != '/images/missing.png' && $scope.file.$ngfBlobUrl) {
                    $scope.upload($scope.file, id);
                } else {
                    toastr.success(resp.config.data.name + " изменен")
                    $state.go("special_guests")
                }
            })

        };

    }])