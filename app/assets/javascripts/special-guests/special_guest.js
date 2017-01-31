angular.module('flapperNews').factory('special_guests', ['$http', 'toastr', function($http, toastr){
    var o = {
        special_guests: [
        ],
        special_guest: [
        ]
    };
    o.getAll = function() {
        return $http.get('/special_guests.json').success(function(data){
            angular.copy(data, o.special_guests);
            //console.log(o)
        }).error(function (data, status, headers, config) {
            toastr.error('<a href="#/login"> Go to Log In Page!</a>', 'Auth Error ' + status, {
                allowHtml: true
            });
        });
    };
    o.create = function(special_guest) {
        //console.log(event)
        return $http.post('/special_guests.json', special_guest).success(function(data){
            //o.events.push(data);
        });
    };

    o.edit = function(special_guest) {
        //console.log(special_guest)
        return $http.put('/special_guests/'+ special_guest.id + '.json', special_guest).success(function(data){
            console.log("Guest has been updated!")
        });
    };

    o.destroy = function(special_guest) {
        return $http.delete('/special_guests/' + special_guest.id + '.json').success(function(data){
            console.log("Guest has been deleted!")
        });
    };
    o.get = function(id) {
        return $http.get('/special_guests/' + id + '.json').then(function(res){
            angular.copy(res.data, o.special_guest);
        });
    };
    //console.log(o)
    return o;
}])