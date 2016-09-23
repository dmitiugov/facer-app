angular.module('flapperNews').controller('specialGuestsCtrl', [
    '$scope',
    'Auth',
    'special_guests',
    function($scope, Auth, special_guests){
        $scope.auth = Auth.isAuthenticated()
        $scope.special_guests = special_guests.special_guests
        console.log($scope.special_guests)
        $scope.deleteSpecialGuest = function(id){
            special_guests.destroy({
                id: id,
            });
        }
    }])