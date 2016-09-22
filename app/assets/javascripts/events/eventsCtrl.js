angular.module('flapperNews').controller('EventsCtrl', [
'$scope',
'events',
    'Auth',
function($scope, events, Auth){
    $scope.auth = Auth.isAuthenticated()
    //console.log($scope.auth)
	$scope.events=events
    $scope.deleteEvent = function(id){
        events.destroy({
            id: id,
        });
    }


}])