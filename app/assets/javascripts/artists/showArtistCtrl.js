angular.module('flapperNews').controller('showArtistCtrl', [
    '$scope',
    'artists',
    'toastr',
    function($scope, artists, toastr){
        //console.log(artists);
        $scope.artist = artists.artist;
        //toastr.success('Hello world!', 'Toastr fun!');

    }])