angular.module('flapperNews').factory('events', ['$http', 'toastr', function($http, toastr){
var o = {
    events: [  
    ],
    event: [
    ],
    special_guests: [
    ],
    giphy: [
    ],
  };
  o.getAll = function() {
  		return $http.get('/events.json').success(function(data){
      	angular.copy(data, o.events);
    }).error(function (data, status, headers, config) {
            toastr.error('<a href="#/login"> Go to Log In Page!</a>', 'Auth Error ' + status, {
                allowHtml: true
            });
        });
  };
  o.getRangedEvents = function(range) {
      console.log(range);
        return $http.post('/events/get_ranged.json', range).success(function(data){
            console.log(data);
            return(data);
        });
    };
  o.getSpecials = function() {
      return $http.get('/special_guests.json').success(function(data) {
          angular.copy(data, o.special_guests);
      })
  };
  o.createGuest = function(guests) {
      //console.log(guests)
      return $http.post('/guests.json', guests).success(function(data){
      });
  }
  o.deleteGuest = function(guest){
      console.log(guest);
      return $http.delete('/guests/' + guest.guest.id + '.json').success(function(data){
          console.log("Guest has been deleted!")
      });

  }
  o.create = function(event) {
      //console.log(event)
      //console.log(typeof event)
        return $http.post('/events.json', event).success(function(data){
            return data
        });
    };

  o.edit = function(event) {
        console.log(event)
        return $http.put('/events/'+ event.id + '.json', event).success(function(data){
            return data
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
    };
    o.changeInside = function(guest) {
        //console.log(guest)
        return $http.put('/guests/'+ guest.id + '.json', guest).success(function(data){
            console.log("Status has been updated!")
        });
    };
    o.deletePhotoFromEvent = function(event) {
        console.log(event);
        return $http.put('/events/'+ event.id + '.json', event).success(function(data){
            return data
            console.log("Event has been updated!")
        });
    }
    o.moveEventToArchive = function(id) {
        console.log(id)
        return $http.post('/events/move_event_to_archive.json', id).success(function(data){
            return(data)
            //console.log(data)
        })
    }
    o.moveEventFromArchive = function(id) {
        console.log(id)
        return $http.post('/events/move_event_from_archive.json', id).success(function(data){
            return(data)
            //console.log(data)
        })
    }
    o.showArchivedEvents = function(archive){
        console.log(archive);
        return $http.post('/events/show_archived_events.json', archive).success(function(data){
            return(data)
            //console.log(data)
        })
    }

return o;
}])