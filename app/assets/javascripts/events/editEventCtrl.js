angular.module('flapperNews').controller('EditEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    function($scope, events, Auth, Upload){
       //console.log(events.event)
        $scope.flash = ''
        $scope.name = events.event.name
        $scope.date = events.event.date
        $scope.description = events.event.description
        $scope.guests = events.event.guests
        $scope.id = events.event.id
        console.log($scope.id)
        $scope.addGuest = function(){
            //console.log($scope.guest)
            $scope.guests.push($scope.guest);
            $scope.guest = '';
        }
        $scope.addEvent = function(){

            events.edit({
             name: $scope.name,
             description: $scope.description,
             date: $scope.date,
                id: $scope.id,
             //guests: $scope.guests,
             });
            $scope.flash = 'Событие изменено';
        };
    }])