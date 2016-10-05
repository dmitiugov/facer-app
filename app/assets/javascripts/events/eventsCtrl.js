angular.module('flapperNews').controller('EventsCtrl', [
'$scope',
'events',
    'Auth',
function($scope, events, Auth){
    $scope.auth = Auth.isAuthenticated()
	$scope.events=events
    $scope.deleteEvent = function(id){
        events.destroy({
            id: id,
        });
    }
    console.log($scope)
    $scope.model = {
        name: 'Tabs'
    };
}])