angular.module('flapperNews').controller('NewEventCtrl', [
    '$scope',
    'events',
    'Auth',
    'Upload',
    function($scope, events, Auth, Upload){
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
                    fields: { 'user[name]': $scope.user_name, name: $scope.name, description: $scope.description, date: $scope.dates.today._d, guests: $scope.guests },
                    file: file,
                    fileFormDataName: 'user[image]'
                });
        }

        $scope.flash = ''
        $scope.events=events
        $scope.guests = [];
        //console.log($scope.events)
        $scope.addGuest = function(){
            //console.log($scope.guest)
            $scope.guests.push($scope.guest);
            $scope.guest = '';
            console.log($scope.guests)
        }
        $scope.addEvent = function(){
            //console.log($scope.guests)
            if ($scope.file) {
                console.log($scope.file)
                $scope.upload($scope.file);
            } else {
                /*events.create({
                    name: $scope.name,
                    description: $scope.description,
                    date: $scope.dates.today._d,
                    guests: $scope.guests,
                })*/
                $scope.file = 'http://a1.mzstatic.com/us/r30/Purple71/v4/9d/34/f5/9d34f54f-7b14-45c6-50dd-c915071c1826/icon175x175.png'
                console.log($scope.file)
                $scope.upload($scope.file);
            }
            $scope.name = '';
            $scope.surname = '';
            $scope.description = '';
            $scope.date = '';
            $scope.guests = [];
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