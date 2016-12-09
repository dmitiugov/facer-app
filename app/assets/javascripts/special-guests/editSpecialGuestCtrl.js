angular.module('flapperNews').controller('editSpecialGuestCtrl', [
    '$scope',
    'special_guests',
    'Auth',
    'Upload',
    function($scope, special_guests, Auth, Upload){
        $scope.flash = ''
        $scope.title = 'Отредактировать постоянного гостя'
        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.user_name = user.username;
        }, function(error) {
            // unauthenticated error
        });
      $scope.flash = 'Гость отредактирован';
    }])