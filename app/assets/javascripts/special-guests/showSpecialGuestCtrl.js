angular.module('flapperNews').controller('showSpecialGuestCtrl', [
    '$scope',
    'Auth',
    'special_guests',
    function($scope, Auth, special_guests){
        //console.log(special_guests.special_guest)
        $scope.special_guest = special_guests.special_guest
    }])