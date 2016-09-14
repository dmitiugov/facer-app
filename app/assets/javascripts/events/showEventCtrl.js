angular.module('flapperNews').controller('ShowEventCtrl', [
    '$scope',
    'events',
    'Auth',
    function($scope, events){
        $scope.eve = events
    }])