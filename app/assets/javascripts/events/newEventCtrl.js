angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    function($scope, events){
        $scope.flash = ''
        $scope.events=events
        //console.log($scope.events)
        $scope.addEvent = function(){
            console.log($scope.name)
            //if(!$scope.name || $scope.name === '') { return; }

            events.create({
                name: $scope.name,
                description: $scope.description,
                date: $scope.date,
            });
            console.log($scope)
            $scope.name = '';
            $scope.description = '';
            $scope.date = '';
            $scope.flash = 'Событие добавлено';
        };



    }])