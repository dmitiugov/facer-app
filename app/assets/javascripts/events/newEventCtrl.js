angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    '$http',
    function($scope, events, Auth, Upload, $http){

    $scope.showSelected = function(){
        //console.log($scope.specials.selected)

        for (var i = 0; i <= $scope.specials.selected.length; i ++) {
            //console.log($scope.specials.selected[i].id)
            $scope.selectedids.push($scope.specials.selected[i].id)
            console.log($scope.selectedids)
        }

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
                //console.log($scope.specials)
            });
        };

    $scope.title = 'Создать событие'
        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.user_name = user.username;
        }, function(error) {
            // unauthenticated error
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
                    //console.log(resp.data);
                    var id = resp.data.id
                    //console.log($scope.guests)
                    $scope.guests.event_id = ''
                    for (var i=0; i<$scope.guests.length; i++) {
                        $scope.guests[i].event_id = id
                        //console.log($scope.guests[i])
                    }
                    events.createGuest({
                      guests: $scope.guests,
                    })
                });
        }

        $scope.flash = ''
        $scope.events=events
        $scope.guests = [];
        //console.log($scope.events)
        $scope.addGuest = function(){
            $scope.guests.push($scope.guest);
            $scope.guest = '';
            //console.log($scope.guests)
        }
        $scope.addEvent = function(){
            if ($scope.file) {
                //console.log($scope.file)

                $scope.upload($scope.file);
            } else {
                events.create({
                    name: $scope.name,
                    description: $scope.description,
                    date: $scope.dates.today._d,
                }).then(function(data) {
                    var id = data.data.id
                    $scope.guests.event_id = ''
                    for (var i=0; i<$scope.guests.length; i++) {
                        $scope.guests[i].event_id = id
                        //console.log($scope.guests[i])
                    }
                    events.createGuest({
                        guests: $scope.guests,
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