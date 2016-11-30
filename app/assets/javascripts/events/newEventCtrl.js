
angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    '$http',
    '$location',
    function($scope, events, Auth, Upload, $http, $location){

        $scope.action = 'Создать событие'
        $scope.dates = {
            today: moment.tz('UTC').hour(12).startOf('h'), //12:00 UTC, today.
            //minDate: moment.tz('UTC').add(-4, 'd').hour(12).startOf('h'), //12:00 UTC, four days ago.
            //maxDate: moment.tz('UTC').add(4, 'd').hour(12).startOf('h'), //12:00 UTC, in four days.
        };
        $scope.eve = {
            name: '',
            file: '',
            description: '',
            date: $scope.dates.today,
            guest: {},
            guests: [],
            specials: [],
            visits: [],
        }

        $scope.addGuest = function(){
            console.log($scope.eve)
            $scope.eve.guests.push($scope.eve.guest)
            $scope.eve.guest = {}
            //console.log($scope.eve.date.format("YYYY-MM-DD HH:mm:ss"))
            //console.log($scope.eve.name)
        }
        $scope.addInfoxGuest = function ($index) {
            console.log($index);
            $scope.eve.guest.age = $scope.dynamicPopover.age;
            console.log($scope.eve.guest);
            console.log($scope.eve.guests);
            $scope.eve.guests[$index].age = '';
            $scope.eve.guests[$index].bio = '';
            $scope.eve.guests[$index].age = $scope.eve.guest.age;
            $scope.eve.guests[$index].bio = $scope.eve.guest.bio;
            console.log($scope.eve.guests);
        }


        //$scope.selectedids = []
        $scope.showSelected = function(){
            console.log($scope.eve.specials.selected)
        }

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

        $scope.refreshSpecials = function(name) {
            var params = {name: name};
            return $http.get(
                '/special_guests.json',
                {params: params}
            ).then(function(response) {
                $scope.eve.specials = response.data;
            });
        };
        $scope.title = 'Создать событие'
        Auth.currentUser().then(function(user) {
            $scope.user_name = user.username;
        }, function(error) {
            console.log(error)
        });
        $scope.upload = function (file) {
            $scope.upload = Upload.upload({
                url: '/events.json',
                method: 'POST',
                fields: { 'user[name]': $scope.user_name,
                    name: $scope.eve.name,
                    description: $scope.eve.description,
                    date: $scope.eve.date.format("YYYY-MM-DD HH:mm:ss"),
                    file: file,
                    fileFormDataName: 'user[image]'},
            }).then(function (resp) {
                var id = resp.data.id

                for (var i=0; i<$scope.eve.guests.length; i++) {
                    $scope.eve.guests[i].event_id = ''
                    $scope.eve.guests[i].event_id = id
                }
                console.log($scope.eve.specials.selected);
                if  ($scope.eve.specials.selected) {
                    for (var i=0; i<$scope.eve.specials.selected.length; i++) {
                        var visit = {};
                        visit.event_id = '';
                        visit.event_id = id;
                        visit.special_id = '';
                        visit.special_id = $scope.eve.specials.selected[i].id;
                        $scope.eve.visits.push(visit);
                    }
                }
                console.log($scope.eve);
                events.createGuest({
                    guests: $scope.eve.guests,
                }).then(function (resp) {
                    events.createVisit({
                        visits: $scope.eve.visits,
                    })
                    $location.path('/events')
                })
            });
        }

        $scope.flash = ''
        $scope.events=events

        $scope.deleteGuest = function ($index) {
            $scope.eve.guests[$index] = null;
        }
        $scope.addInfoGuest = function ($index) {
            console.log($index);

        }

        $scope.dynamicPopover = {
            templateUrl: 'events/templates/edit_guest.html',
            title: 'Add Info',
            age: 18,
            ageHeading: 'Age',
            bio: 'Bio'
        };
        $scope.addEvent = function(eve){

            if ($scope.eve.file) {
                $scope.upload($scope.eve.file);
            } else {
                events.create({
                    name: $scope.eve.name,
                    description: $scope.eve.description,
                    date: $scope.eve.date.format("YYYY-MM-DD HH:mm:ss"),
                }).then(function(data) {
                    var id = data.data.id
                    for (var i=0; i<$scope.eve.guests.length; i++) {
                        $scope.eve.guests[i].event_id = ''
                        $scope.eve.guests[i].event_id = id
                    }
                    if  ($scope.eve.specials.selected) {

                        for (var i=0; i<$scope.eve.specials.selected.length; i++) {
                            var visit = {};
                            visit.event_id = '';
                            visit.event_id = id;
                            visit.special_id = '';
                            visit.special_id = $scope.eve.specials.selected[i].id;
                            $scope.eve.visits.push(visit);
                        }
                    }
                     events.createGuest({
                     guests: $scope.eve.guests,
                     }).then(function (resp) {
                         console.log($scope.eve);
                         events.createVisit({
                            visits: $scope.eve.visits,
                         }).then(function (resp) {
                             $location.path('/events')
                         })
                     })
                }, function(error) {
                    console.log('Error Create')
                });
            }
            $scope.flash = 'Событие добавлено';
        }
    }])