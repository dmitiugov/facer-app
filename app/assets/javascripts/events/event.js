angular.module('flapperNews').factory('events', ['$http', function($http){
var o = {
    events: [  
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
  //console.log(o)
return o;
}])