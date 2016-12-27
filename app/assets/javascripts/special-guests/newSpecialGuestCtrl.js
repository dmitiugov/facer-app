angular.module('flapperNews').controller('newSpecialGuestCtrl', [
    '$scope',
    'special_guests',
    'Auth',
    'Upload',
    function($scope, special_guests, Auth, Upload){
        $scope.flash = ''
        $scope.title = 'Добавить постоянного гостя'
        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.user_name = user.username;
        }, function(error) {
            // unauthenticated error
        });
        $scope.upload = function (file) {
            $scope.upload = Upload.upload({
                url: '/special_guests.json',
                method: 'POST',
                fields: { 'user[name]': $scope.user_name, name: $scope.name, surname: $scope.surname, bio: $scope.bio, description: $scope.description, age: $scope.age},
                file: file,
                fileFormDataName: 'user[image]'
            });
        }
        $scope.addSpecialGuest = function(){
            if ($scope.file) {
                //console.log($scope.file)
                $scope.upload($scope.file);
            } else {
                $scope.file = '/system/special_guests/20151012_561baed03a54e.jpg'
                console.log($scope.file)
                $scope.upload($scope.file);
            }
            $scope.name = '';
            $scope.surname = '';
            $scope.description = '';
            $scope.bio = '';
            $scope.age = '';
            $scope.flash = 'Гость добавлен';
            $scope.file=null;
        };
    }])