angular.module('flapperNews').controller('EditEventCtrl', [
    '$scope',
    'events',
    'shows',
    'Auth',
    'Upload',
    '$http',
    '$location',
    function($scope, events, shows, Auth, Upload, $http, $location){
    $scope.title = 'Редактировать событие'
        $scope.eve = {};
        $scope.edit = true
        $scope.flash = ''
        $scope.eve.name = events.event.name
        $scope.eve.date = events.event.date
        $scope.eve.visits = []
        $scope.eve.visits = events.event.visits
        $scope.eve.shows = []
        $scope.eve.shows = events.event.shows
        $scope.eve.description = events.event.description
        $scope.eve.guests = events.event.guests
        $scope.eve.newguests = []
        $scope.eve.file = events.event.file
        $scope.eve.id = events.event.id
        $scope.eve.specials = []
        $scope.eve.artists = []
        $scope.maskOptions = {
            maskDefinitions:
            { '2':/[0-2]/, '4':/[0-4]/, '5':/[0-5]/, '9':/[0-9]/ }
        }
        $scope.addTimeToShow = function(){
            console.log($scope.eve.artists.selected)
        }
        $scope.showScope = function () {
            //console.log($scope.eve);
            $scope.addTimeToShow();
        }
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
        $scope.refreshArtists = function (name) {
            //console.log(events.event)
            var selected = events.event.artists;
            var params = {name: name};
            return $http.get(
                '/artists.json',
                {params: params}
            ).then(function(response) {
                $scope.eve.artists = response.data;
                $scope.eve.artists.selected = selected;
                console.log($scope.eve)
                for(var i=0;i<$scope.eve.artists.selected.length;i++){
                    for (var j=0; j<$scope.eve.shows.length; j++) {
                        if ($scope.eve.artists.selected[i].id == $scope.eve.shows[j].artist_id) {
                            $scope.eve.artists.selected[i].time_start = $scope.eve.shows[j].time_start;
                            $scope.eve.artists.selected[i].time_end = $scope.eve.shows[j].time_end;
                        }
                    }
                }
                console.log($scope.eve)
            });
        }
        $scope.selectAllArtists = function() {
            $scope.eve.artists.selected = []
            for(var i = 0; i<$scope.eve.artists.length; i++) {
                var artist = $scope.eve.artists[i]
                $scope.eve.artists.selected.push(artist);
            }
            if($scope.eve.shows.length!=0)
                shows.deleteAllShows({
                    event: $scope.eve.id,
                })
            $scope.eve.new_show = []
            if  ($scope.eve.artists.selected) {
                for (var i=0; i<$scope.eve.artists.selected.length; i++) {
                    var show = {};
                    show.event_id = '';
                    show.event_id = $scope.eve.id;
                    show.artist_id = '';
                    show.artist_id = $scope.eve.artists.selected[i].id;
                    show.time_start='';
                    show.time_end='';
                    $scope.eve.new_show.push(show);

                }
                shows.createShow({
                    shows: $scope.eve.new_show,
                })
            }
        };
        $scope.selectAll = function() {
            $scope.eve.specials.selected = []
            for(var i = 0; i<$scope.eve.specials.length; i++) {
                var special = $scope.eve.specials[i]
                $scope.eve.specials.selected.push(special);
            }
            if ($scope.eve.visits.length!=0)
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
        $scope.deletePhoto = function() {
            events.deletePhotoFromEvent({
                id: $scope.eve.id,
                file: null,
            }).then(function () {
                $scope.eve.file = null;
            })
        }
        $scope.resetAllArtists = function() {
            if($scope.eve.artists.selected)
                shows.deleteAllShows({
                    event_id: $scope.eve.id,
                }).then(function(){
                    $scope.eve.artists.selected = null
                })
        }
        $scope.deleteVisit = function($item) {

           events.checkVisit({
               special_id: $item.id,
               event_id: $scope.eve.id,
           }).then(function(response){
               //console.log(response.data);
               events.deleteVisit({
                   visit: response.data,
               })
           })
        }
        $scope.deleteShow = function($item) {
            shows.checkShow({
                artist_id: $item.id,
                event_id: $scope.eve.id,
            }).then(function (response) {
                //console.log(response.data);
                shows.deleteShow({
                    show: response.data,
                })
            })
        }
        $scope.AddOnEnter = function(keyEvent) {
            if (keyEvent.which === 13)
                $scope.addGuest();
        }
        $scope.addInfoxGuest = function ($index) {
            //$scope.eve.guest.age = $scope.dynamicPopover.age;
            //$scope.eve.guests[$index].age = '';
            $scope.eve.guests[$index].bio = '';
            //$scope.eve.guests[$index].age = $scope.eve.guest.age;
            $scope.eve.guests[$index].bio = $scope.eve.guest.bio;
        }
        $scope.dynamicPopover = {
            templateUrl: 'events/templates/edit_guest.html',
            title: 'Add Info',
            //age: 18,
            //ageHeading: 'Age',
            bio: 'Bio'
        };
        $scope.addShow = function($item) {
            var show = {};
            show.event_id = '';
            show.event_id = $scope.eve.id;
            show.artist_id = '';
            show.artist_id = $item.id;
            show.time_start='';
            show.time_end='';
            $scope.eve.new_show = []
            $scope.eve.new_show.push(show);
            shows.createShow({
                shows: $scope.eve.new_show,
            }).then(function (data) {
                //console.log(data.data);
                //console.log($scope.eve);
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
        $scope.editFields = function() {
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
              /*  if($scope.eve.specials.selected!=null)
                    for (var i=0; i<$scope.eve.specials.selected.length; i++){
                        $scope.eve.specials.selected[i].event_id=''
                        $scope.eve.specials.selected[i].event_id = id
                    }*/
                for(var i=0;i<$scope.eve.artists.selected.length;i++){
                    for (var j=0; j<$scope.eve.shows.length; j++) {
                        if ($scope.eve.artists.selected[i].id == $scope.eve.shows[j].artist_id) {
                            $scope.eve.shows[j].time_start = $scope.eve.artists.selected[i].time_start;
                            $scope.eve.shows[j].time_end = $scope.eve.artists.selected[i].time_end;
                        }
                    }
                    console.log($scope.eve.shows)
                }

                shows.changeShowTime({
                    shows: $scope.eve.shows,
                })
                events.createGuest({
                    guests: $scope.eve.newguests,
                }).then(function (resp) {
                    console.log($scope.eve)
                        //events.edit($scope.eve);
                })
            })
        }
        $scope.upload = function (file) {
            $scope.upload = Upload.upload({
                url: '/events/'+ $scope.eve.id + '.json',
                method: 'PUT',
                fields: {
                    'user[name]': $scope.user_name,
                    file: file,
                    id: $scope.eve.id
                },
            }).then(function(resp){
                //console.log(resp);
                $scope.editFields()
            })
        }
        $scope.addEvent = function(){
            //console.log($scope.eve.file, $scope.eve)
            if ($scope.eve.file && $scope.eve.file != '/images/missing.png' && $scope.eve.file.$ngfBlobUrl) {
                $scope.upload($scope.eve.file);
            } else {
                //console.log('!!!')
                $scope.editFields();
            }

            $scope.flash = 'Событие изменено';
        };
        $scope.action = 'Изменить событие'
    }])