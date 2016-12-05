angular.module('flapperNews').controller('EditEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    '$http',
    '$location',
    function($scope, events, Auth, Upload, $http, $location){
    $scope.title = 'Редактировать событие'
        $scope.eve = {};

        $scope.edit = true
        $scope.flash = ''
        $scope.eve.name = events.event.name
        $scope.eve.date = events.event.date
        $scope.eve.visits = []
        $scope.eve.visits = events.event.visits
        $scope.eve.description = events.event.description
        $scope.eve.guests = events.event.guests
        $scope.eve.newguests = []
        $scope.eve.file = events.event.file
        $scope.eve.id = events.event.id
        $scope.eve.specials = []
        console.log($scope.eve)
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
        $scope.selectAll = function() {
            $scope.eve.specials.selected = []
            for(var i = 0; i<$scope.eve.specials.length; i++) {
                var special = $scope.eve.specials[i]
                $scope.eve.specials.selected.push(special);
            }
            for (var i=0; i<$scope.eve.visits.length; i++) {
                events.deleteVisit({
                    visit: $scope.eve.visits[i].id,
                })
            }
            $scope.eve.new_visit = []
            if  ($scope.eve.specials.selected) {
                for (var i=0; i<$scope.eve.specials.selected.length; i++) {
                    var visit = {};
                    visit.event_id = '';
                    visit.event_id = $scope.eve.id;
                    visit.special_id = '';
                    visit.special_id = $scope.eve.specials.selected[i].id;
                    $scope.eve.new_visit.push(visit);
                }
                events.createVisit({
                    visits: $scope.eve.new_visit,
                })
            }
        };
        $scope.resetAll = function() {
            $scope.eve.specials.selected = null
            if ($scope.edit) {
                for (var i=0; i<$scope.eve.visits.length; i++) {
                    events.deleteVisit({
                        visit: $scope.eve.visits[i].id,
                    })
                }
            }

        }
        $scope.deleteVisit = function($item) {
            for (var i=0; i<$scope.eve.visits.length; i++) {
                if($scope.eve.visits[i].special_guest_id == $item.id) {
                    var visitId = $scope.eve.visits[i].id;
                    $scope.eve.visits.slice(i);
                    $scope.eve.visits.splice(i,1);
                }
            }
            events.deleteVisit({
                visit: visitId,
            })
        }
        $scope.addVisit = function($item) {
            var visit = {};
            visit.event_id = '';
            visit.event_id = $scope.eve.id;
            visit.special_id = '';
            visit.special_id = $item.id;
            $scope.eve.new_visit = []
            $scope.eve.new_visit.push(visit);
            console.log($scope.eve.visits);
            events.createVisit({
                visits: $scope.eve.new_visit,
            })
        }
        $scope.addGuest = function(){
            $scope.eve.newguests.push($scope.eve.guest);
            $scope.eve.guests.push($scope.eve.guest);
            $scope.eve.guest = '';
        }
        $scope.deleteGuest = function ($index) {
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
             }).then(function (data) {
                var id = $scope.eve.id
                for (var i=0; i<$scope.eve.newguests.length; i++) {
                    $scope.eve.newguests[i].event_id = ''
                    $scope.eve.newguests[i].event_id = id
                }
                if($scope.eve.specials.selected!=null)
                    for (var i=0; i<$scope.eve.specials.selected.length; i++){
                        $scope.eve.specials.selected[i].event_id=''
                        $scope.eve.specials.selected[i].event_id = id
                    }

                events.createGuest({
                    guests: $scope.eve.newguests,
                }).then(function (resp) {
                })
            })
            $scope.flash = 'Событие изменено';
        };
        $scope.action = 'Изменить событие'
    }])