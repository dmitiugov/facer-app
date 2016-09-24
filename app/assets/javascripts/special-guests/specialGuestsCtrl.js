angular.module('flapperNews').controller('specialGuestsCtrl', [
    '$scope',
    'Auth',
    'special_guests',
    function($scope, Auth, special_guests){
        $scope.special_guests = special_guests.special_guests
        $scope.deleteSpecialGuest = function(id){
            special_guests.destroy({
                id: id,
            });
        }
        $scope.getRowClass = function(key){
            console.log(key)
            if(key%3 == 0){
                return "row";

            }
        }
        $scope.isRow = function($index){
            if ($index%3==2) {
                return true
            }
        }
    }])