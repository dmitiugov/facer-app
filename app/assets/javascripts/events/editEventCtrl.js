angular.module('flapperNews').controller('EditEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    function($scope, events, Auth, Upload){
    $scope.title = 'Редактировать событие'
       //console.log(events.event)
        $scope.edit = true
        $scope.flash = ''
        $scope.name = events.event.name
        $scope.date = events.event.date
        $scope.description = events.event.description
        $scope.guests = events.event.guests
        $scope.newguests = []
        $scope.file = events.event.file
        $scope.id = events.event.id
        console.log($scope.id)
        $scope.addGuest = function(){
            //console.log($scope.guest)
            $scope.newguests.push($scope.guest);
            $scope.guests.push($scope.guest);
            $scope.guest = '';
        }
        $scope.deleteGuest = function ($index) {
            $scope.guests[$index] = null
        }
        $scope.addEvent = function(){

            events.edit({
             name: $scope.name,
             description: $scope.description,
             date: $scope.date,
                id: $scope.id,
             guests: $scope.newguests,
             });
            $scope.flash = 'Событие изменено';
        };
    }])