angular.module('flapperNews').factory('special_guests', ['$http', function($http){
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
        });
    };
    /*o.create = function(event) {
        //console.log(event)
        return $http.post('/events.json', event).success(function(data){
            //o.events.push(data);
        });
    };

    o.edit = function(event) {
        console.log(event)
        return $http.put('/events/'+ event.id + '.json', event).success(function(data){
            console.log("Event has been updated!")
        });
    };

    o.destroy = function(event) {
        return $http.delete('/events/' + event.id + '.json').success(function(data){
            console.log("Event has been deleted!")
        });
    };
    o.get = function(id) {
        return $http.get('/events/' + id + '.json').then(function(res){
            angular.copy(res.data, o.event);
        });
    };*/
    //console.log(o)
    return o;
}])