angular.module('flapperNews').controller('ShowEventCtrl', [
    '$scope',
    'events',
    'Auth',
    function($scope, events){
        $scope.eve = events
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchSurname   = '';     // set the default search/filter term
    }])