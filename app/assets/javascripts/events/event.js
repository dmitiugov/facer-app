angular.module('flapperNews').factory('events', ['$http', function($http){
var o = {
    events: [  
    ],
    event: [
    ]
  };
  o.getAll = function() {
  		return $http.get('/events.json').success(function(data){
      	angular.copy(data, o.events);
      	//console.log(o)
    });
  };
  o.create = function(event) {
      console.log(event)
        return $http.post('/events.json', event).success(function(data){
            //o.events.push(data);
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
    };
    //console.log(o)
return o;
}])