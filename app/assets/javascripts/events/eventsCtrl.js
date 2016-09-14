angular.module('flapperNews').controller('EventsCtrl', [
'$scope',
'events',
    'Auth',
function($scope, events){
	$scope.events=events
    $scope.deleteEvent = function(id){
        //console.log(434234)
        console.log(id)
        events.destroy({
            id: id,
        });
    }
}])