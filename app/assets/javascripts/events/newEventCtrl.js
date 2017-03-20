
angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'shows',
    'visits',
    'Auth',
    'Upload',
    '$http',
    '$location',
    'toastr',
    function($scope, events, shows, visits, Auth, Upload, $http, $location, toastr){
        $scope.redirectUrl = '/events';
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
            shows: [],
            artists: [],
        }

        $scope.maskOptions = {
            maskDefinitions:
                { '2':/[0-2]/, '4':/[0-4]/, '5':/[0-5]/, '9':/[0-9]/ }
        }
        $scope.addGuest = function(){
            console.log($scope.eve)
            $scope.eve.guests.push($scope.eve.guest)
            $scope.eve.guest = {}
            //console.log($scope.eve.date.format("YYYY-MM-DD HH:mm:ss"))
            //console.log($scope.eve.name)
        }
        $scope.addInfoxGuest = function ($index) {
            //$scope.eve.guest.age = $scope.dynamicPopover.age;
            //$scope.eve.guests[$index].age = '';
            $scope.eve.guests[$index].bio = '';
            //$scope.eve.guests[$index].age = $scope.eve.guest.age;
            $scope.eve.guests[$index].bio = $scope.eve.guest.bio;
        }
        var refreshStatusArtists = true
        var refreshStatusSpecials = true
        $scope.loadRefreshArtists = function() {
            if (refreshStatusArtists)
                $scope.refreshArtists();
            refreshStatusArtists = false;
        }
        $scope.loadRefreshSpecials = function() {
            if (refreshStatusSpecials)
                $scope.refreshSpecials();
            refreshStatusSpecials = false;
        }
        $scope.AddOnEnter = function(keyEvent) {
            if (keyEvent.which === 13)
                $scope.addGuest();
        }
        $scope.selectAll = function() {
            $scope.eve.specials.selected = []
            for(var i = 0; i<$scope.eve.specials.length; i++) {
                var special = $scope.eve.specials[i]
                $scope.eve.specials.selected.push(special);
            }
        };
        $scope.selectAllArtists = function() {
            $scope.eve.artists.selected = []
            for(var i = 0; i<$scope.eve.artists.length; i++) {
                var artist = $scope.eve.artists[i]
                $scope.eve.artists.selected.push(artist);
            }
        };
        $scope.resetAllArtists = function() {
            $scope.eve.artists.selected = null
        }
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
        $scope.refreshArtists = function (name) {
            var params = {name: name};
            return $http.get(
                '/artists.json',
                {params: params}
            ).then(function(response) {
                $scope.eve.artists = response.data;
            });
        }
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
                if ($scope.eve.artists.selected)
                    for (var i=0; i<$scope.eve.artists.selected.length; i++) {
                        var show={};
                        show.event_id='';
                        show.event_id = id;
                        console.log($scope.eve.artists.selected)
                        show.artist_id='';
                        show.artist_id=$scope.eve.artists.selected[i].id;
                        show.artist_name='';
                        show.artist_name=$scope.eve.artists.selected[i].name;
                        show.time_start='';
                        show.time_end='';
                        show.time_start=$scope.eve.artists.selected[i].time_start;
                        show.time_end=$scope.eve.artists.selected[i].time_end;
                        $scope.eve.shows.push(show);
                    }
                console.log($scope.eve);
                events.createGuest({
                    guests: $scope.eve.guests,
                }).then(function (resp) {
                    events.createVisit({
                        visits: $scope.eve.visits,
                    }).then(function (resp) {
                        //console.log($scope.eve.shows)
                        shows.createShow({
                            shows: $scope.eve.shows,
                        })
                    })
                    toastr.success("Событие создано")
                    $location.path($scope.redirectUrl);
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
            //age: 18,
            //ageHeading: 'Age',
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
                    if ($scope.eve.artists.selected)
                        for (var i=0; i<$scope.eve.artists.selected.length; i++) {
                            var show={};
                            //console.log($scope.eve.artists.selected)
                            show.event_id='';
                            show.event_id = id;
                            show.artist_id='';
                            show.artist_id=$scope.eve.artists.selected[i].id;
                            show.artist_name='';
                            show.artist_name=$scope.eve.artists.selected[i].name;
                            show.time_start='';
                            show.time_end='';
                            show.time_start=$scope.eve.artists.selected[i].time_start;
                            show.time_end=$scope.eve.artists.selected[i].time_end;
                            $scope.eve.shows.push(show);
                        }
                     events.createGuest({
                     guests: $scope.eve.guests,
                     }).then(function (resp) {
                         console.log($scope.eve);
                         visits.createVisit({
                            visits: $scope.eve.visits,
                         }).then(function (resp) {
                             console.log($scope.eve.shows)
                             shows.createShow({
                                 shows: $scope.eve.shows
                             })
                         }).then(function (resp) {
                             toastr.success("Событие создано")
                             $location.path($scope.redirectUrl);
                         })
                     })
                }, function(error) {
                    console.log('Error Create')
                });
            }
            $scope.flash = 'Событие добавлено';
        }
    }])