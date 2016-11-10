angular.module('flapperNews').controller('showArtistCtrl', [
    '$scope',
    'artists',
    function($scope, artists){
        //console.log(artists);
        $scope.artist = artists.artist;

    }])