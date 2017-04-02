angular.module('flapperNews')
    .filter('addComma', function () {
        return function (item) {
            //console.log(item.length);
            var hours = item.substring(0, item.length-2);
            var mins = item.substring(item.length-2,item.length);
            return hours + ':' + mins;
        };
    })
    .controller('ShowEventCtrl', [
    '$scope',
    'events',
    'Auth',
        '$location',
        '$window',
    function($scope, events, Auth, $location, $window){
        $scope.isRow = function($index){
            console.log($index);
            if ($index%3==2) {
                return true
            }
        }
        $scope.inside = 'Внутри'
        $scope.outside = 'Снаружи'
        $scope.eve = events
        console.log($scope.eve.event)
        //console.log($scope.eve.event, $scope.eve);
        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchSurname   = '';     // set the default search/filter term

        $scope.changeStatus = function(id, inside, guest_type) {
            if(guest_type == 'special') {
                for (var i=0; i<$scope.eve.event.visits.length; i++) {
                    if ($scope.eve.event.visits[i].special_guest_id == id) {
                        console.log($scope.eve.event.visits[i].id)
                        var id_visit = $scope.eve.event.visits[i].id
                    }
                }
                if(id_visit) {
                    events.changeSpecialInside({
                        id: id_visit,
                        inside: !inside,
                    }).then(function(resp){
                        var id = $scope.eve.event.id
                        //$window.location.reload();
                        events.get(id).then(function (resp) {
                            $scope.addVisitsStatusToSpecials();
                        })
                    })
                }
            } else {
                if(id) {
                    events.changeInside({
                        id: id,
                        inside: !inside,
                    }).then(function (resp) {
                        var id = $scope.eve.event.id
                        events.get(id).then(function (resp) {
                            $scope.addVisitsStatusToSpecials();
                        })
                    }, function(error) {
                        //console.log('Error Status')
                    })
                }
            }
        }
        $scope.addVisitsStatusToSpecials = function () {
            for (var i=0; i<$scope.eve.event.visits.length; i++) {
                if ($scope.eve.event.visits[i].special_guest_id == $scope.eve.event.special_guests[i].id) {
                    $scope.eve.event.special_guests[i].inside = $scope.eve.event.visits[i].inside;
                    //console.log($scope.eve.event)
                }
            }
        }
        $scope.addVisitsStatusToSpecials();
    }])