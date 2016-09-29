angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    '$http',
    function($scope, events, Auth, Upload, $http){

    $scope.showSelected = function(){
        console.log($scope.specials.selected)
        }

        $scope.specials = []
        $scope.selectedids = []
       $scope.refreshSpecials = function(name) {
            var params = {name: name, sensor: false};
            return $http.get(
                '/special_guests.json',
                {params: params}
            ).then(function(response) {
                $scope.specials = response.data;
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
                        name: $scope.name,
                        description: $scope.description,
                        date: $scope.dates.today._d,
                    file: file,
                    fileFormDataName: 'user[image]'},
                }).then(function (resp) {
                    var id = resp.data.id
                    $scope.guests.event_id = ''
                    for (var i=0; i<$scope.guests.length; i++) {
                        $scope.guests[i].event_id = id
                    }
                    console.log($scope.specials.selected)
                    for (var i=0; i<$scope.specials.selected.length; i++){
                        $scope.specials.selected[i].event_id=''
                        $scope.specials.selected[i].event_id = id
                    }
                    console.log($scope.specials.selected)
                    if($scope.guests || $scope.specials.selected) {
                        events.createGuest({
                            guests: $scope.guests,
                            specials: $scope.specials.selected,
                        })
                    }
                });
        }

        $scope.flash = ''
        $scope.events=events
        $scope.guests = [];
        //console.log($scope.events)
        $scope.addGuest = function(){
            $scope.guests.push($scope.guest);
            $scope.guest = '';
        }
        $scope.addEvent = function(){
            if ($scope.file) {
                $scope.upload($scope.file);
            } else {
                events.create({
                    name: $scope.name,
                    description: $scope.description,
                    date: $scope.dates.today._d,
                }).then(function(data) {
                    var id = data.data.id
                    $scope.guests.event_id = ''
                    console.log($scope.specials.selected)
                    for (var i=0; i<$scope.guests.length; i++) {
                        $scope.guests[i].event_id = id
                    }

                    for (var i=0; i<$scope.specials.selected.length; i++){
                        $scope.specials.selected[i].event_id=''
                        $scope.specials.selected[i].event_id = id
                    }
                    events.createGuest({
                        guests: $scope.guests,
                        specials: $scope.specials.selected,
                    })
                }, function(error) {
                   console.log('Error Create')
                });
            }
            $scope.name = '';
            $scope.surname = '';
            $scope.description = '';
            $scope.date = '';
            $scope.flash = 'Событие добавлено';
        };


        $scope.dates = {
            today: moment.tz('UTC').hour(12).startOf('h'), //12:00 UTC, today.
            //minDate: moment.tz('UTC').add(-4, 'd').hour(12).startOf('h'), //12:00 UTC, four days ago.
            //maxDate: moment.tz('UTC').add(4, 'd').hour(12).startOf('h'), //12:00 UTC, in four days.
        };
        /*$scope.consoleDate = function(){
            console.log($scope.dates.today._d)
        }*/

    }])