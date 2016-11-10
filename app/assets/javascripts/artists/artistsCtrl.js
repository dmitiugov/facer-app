angular.module('flapperNews').controller('artistsCtrl', [
    '$scope',
    'artists',
    function($scope, artists){
        $scope.artists = artists.artists
        $scope.deleteArtist = function(id){
            artists.destroy({
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