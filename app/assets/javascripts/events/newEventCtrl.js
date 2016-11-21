
angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    '$http',
    '$timeout',
    '$location',
    '$compile',
    function($scope, events, Auth, Upload, $http, $timeout, $location, $compile){


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
            $scope.eve.specials.selected = $scope.eve.specials
        };
        $scope.resetAll = function() {
            $scope.eve.specials.selected = []
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

                for (var i=0; i<$scope.eve.specials.selected.length; i++){
                    $scope.eve.specials.selected[i].event_id=''
                    $scope.eve.specials.selected[i].event_id = id
                }
                events.createGuest({
                    guests: $scope.eve.guests,
                    specials: $scope.eve.specials.selected,
                }).then(function (resp) {
                    console.log(resp)
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

                    for (var i=0; i<$scope.eve.specials.selected.length; i++){
                     $scope.eve.specials.selected[i].event_id=''
                     $scope.eve.specials.selected[i].event_id = id
                     }
                     events.createGuest({
                     guests: $scope.eve.guests,
                     specials: $scope.eve.specials.selected,
                     }).then(function (resp) {
                         console.log(resp)
                         $location.path('/events')
                     })
                }, function(error) {
                    console.log('Error Create')
                });
            }
            $scope.flash = 'Событие добавлено';
        }


    }])