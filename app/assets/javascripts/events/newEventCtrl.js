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
            }
            /*events.create({
                name: $scope.name,
                description: $scope.description,
                date: $scope.dates.today._d,
                guests: $scope.guests,
            });*/
            //console.log($scope)
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