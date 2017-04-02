angular.module('flapperNews').controller('EditEventCtrl', [
    '$scope',
    'events',
    'shows',
    'visits',
    'Auth',
    'Upload',
    '$http',
    '$location',
    '$state',
    'toastr',
    function($scope, events, shows, visits, Auth, Upload, $http, $location, $state, toastr){
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
                }).then(function (data) {
                    console.log(data);
                })
            }
        };
        //удалить всех спец гостей из события
        $scope.resetAll = function() {
            if($scope.eve.specials.selected)
                visits.deleteAllVisits({
                    event_id: $scope.eve.id,
                }).then(function(){
                    $scope.eve.specials.selected = null
                    toastr.success("Гости удалены")
                }, function (error) {
                    toastr.error("Ошибка");
                })
        }
        //добавить всех спец гостей к событию
        //TODO: переписать точно также артистов
        $scope.selectAll = function() {
               visits.selectAllVisits({
                    event_id: $scope.eve.id,
                    specials: $scope.eve.specials,
                }).then(function(){
                console.log($scope.eve.specials)
                   $scope.eve.specials.selected = $scope.eve.specials
                   toastr.success("Гости добавлены")
                }, function (error) {
                   toastr.error("Ошибка");
               })
        };
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

           visits.checkVisit({
               special_id: $item.id,
               event_id: $scope.eve.id,
           }).then(function(response){
               //console.log(response.data);
               visits.deleteVisit({
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
            console.log($item);
            show.event_id = '';
            show.event_id = $scope.eve.id;
            show.artist_id = '';
            show.artist_id = $item.id;
            show.artist_name = '';
            show.artist_name = $item.name;
            show.time_start='';
            show.time_end='';
            $scope.eve.new_show = []
            $scope.eve.new_show.push(show);
            shows.createShow({
                shows: $scope.eve.new_show,
            }).then(function (data) {
                console.log(data);
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
            visits.createVisit({
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

        }
        $scope.upload = function (file, id) {
            $scope.upload = Upload.upload({
                url: '/files/add_file_to_event.json',
                method: 'POST',
                fields: {
                    id: id,
                    file: file,
                    fileFormDataName: 'user[image]'
                },
            }).then(function (resp) {
                console.log(resp)
            });
        }
        $scope.addEvent = function(){
            var id = $scope.eve.id;
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
                }).then(function () {
                    if ($scope.eve.file && $scope.eve.file != '/images/missing.png' && $scope.eve.file.$ngfBlobUrl) {
                        $scope.upload($scope.eve.file, id);
                    }
                })
        };
        $scope.action = 'Изменить событие'
    }])