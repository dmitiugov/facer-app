angular.module('flapperNews').controller('EventsCtrl', [
'$scope',
'events',
    'Auth',
    'Upload',
function($scope, events, Auth, Upload){
    console.log(Upload)
    $scope.auth = Auth.isAuthenticated()
    //console.log($scope.auth)
	$scope.events=events
    $scope.deleteEvent = function(id){
        events.destroy({
            id: id,
        });
    }


}])