angular.module('flapperNews').controller('ShowEventCtrl', [
    '$scope',
    'events',
    'Auth',
    function($scope, events){
        $scope.eve = events
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchSurname   = '';     // set the default search/filter term

        $scope.changeStatus = function(id, inside) {
            console.log(id)
            console.log(inside)
            if(id) {
                events.changeInside({
                    id: id,
                    inside: !inside,
                }).then(function (resp) {
                    console.log(resp)
                    var id = $scope.eve.event.id
                    console.log($scope.eve.event.id)
                    events.get(id)
                    $scope.eve = events
                }, function(error) {
                    console.log('Error Status')
                })
            }

        }
    }])