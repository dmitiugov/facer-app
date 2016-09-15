angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    function($scope, events){
        $scope.flash = ''
        $scope.events=events
        $scope.guests = [];
        console.log($scope.events)
        $scope.addGuest = function(){
            console.log($scope.guest)
            $scope.guests.push($scope.guest);
            $scope.guest = '';
            console.log($scope.guests)
        }
        $scope.addEvent = function(){
            console.log($scope.guests)
            events.create({
                name: $scope.name,
                description: $scope.description,
                date: $scope.date,
                guests: $scope.guests,
            });
            //console.log($scope)
            $scope.name = '';
            $scope.description = '';
            $scope.date = '';
            $scope.guests = [];
            $scope.flash = 'Событие добавлено';
        };



    }])