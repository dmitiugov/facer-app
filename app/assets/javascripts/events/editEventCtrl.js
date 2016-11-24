angular.module('flapperNews').controller('EditEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    '$http',
    '$location',
    function($scope, events, Auth, Upload, $http, $location){
    $scope.title = 'Редактировать событие'
       //console.log(events.event)
        $scope.eve = {};

        $scope.selectAll = function() {
            $scope.eve.specials.selected = []
            for(var i = 0; i<$scope.eve.specials.length; i++) {
                var special = $scope.eve.specials[i]
                $scope.eve.specials.selected.push(special);
            }
        };
        $scope.resetAll = function() {
            $scope.eve.specials.selected = null
        }

        $scope.edit = true
        $scope.flash = ''
        $scope.eve.name = events.event.name
        $scope.eve.date = events.event.date
        $scope.eve.description = events.event.description
        $scope.eve.guests = events.event.guests
        $scope.eve.newguests = []
        $scope.eve.file = events.event.file
        $scope.eve.id = events.event.id
        $scope.eve.specials = []

        $scope.refreshSpecials = function(name) {
            var selected = events.event.special_guests;
            var params = {name: name};
            return $http.get(
                '/special_guests.json',
                {params: params}
            ).then(function(response) {
                $scope.eve.specials = response.data;
                $scope.eve.specials.selected = selected;
            });

        };
        //console.log($scope.id)
        $scope.addGuest = function(){
            //console.log($scope.guest)
            $scope.eve.newguests.push($scope.eve.guest);
            $scope.eve.guests.push($scope.eve.guest);
            $scope.eve.guest = '';
        }
        $scope.deleteGuest = function ($index) {
            //console.log($scope.eve.guests[$index]);
            events.deleteGuest({
                guest: $scope.eve.guests[$index],
            })
            $scope.eve.guests[$index] = null

        }
        $scope.addEvent = function(){

            events.edit({
             name: $scope.eve.name,
             description: $scope.eve.description,
             date: $scope.eve.date,
             id: $scope.eve.id,
             //guests: $scope.eve.newguests,
             }).then(function (data) {
                //console.log(data)
                var id = $scope.eve.id
                for (var i=0; i<$scope.eve.newguests.length; i++) {
                    $scope.eve.newguests[i].event_id = ''
                    $scope.eve.newguests[i].event_id = id
                }
                for (var i=0; i<$scope.eve.specials.selected.length; i++){
                    $scope.eve.specials.selected[i].event_id=''
                    $scope.eve.specials.selected[i].event_id = id
                }
                console.log($scope.eve.specials.selected);
                events.createGuest({
                    guests: $scope.eve.newguests,
                    specials: $scope.eve.specials.selected,
                }).then(function (resp) {
                    //console.log(resp)
                    $location.path('/events')
                })
            })
            $scope.flash = 'Событие изменено';
        };
        $scope.action = 'Изменить событие'
    }])