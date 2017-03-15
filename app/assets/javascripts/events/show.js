angular.module('flapperNews').factory('shows', ['$http', 'toastr', function($http, toastr){
var o = {
    shows: [

    ],
}
    o.createShow = function(shows) {
        console.log('!!!');
        return $http.post('/shows.json', shows).success(function (data) {
            console.log(data);
        })
    }
    o.checkShow = function (show) {
        console.log(show);
        return $http.post('/shows/check_show.json', show).success(function (data) {
            console.log(data);
        })
    }
    o.deleteShow = function(show) {
        console.log(show)
        if(show.show.id) {
            return $http.delete('/shows/' + show.show.id + '.json').success(function(data){
                console.log("Show has been deleted!")
            });
        } else {
            return $http.delete('/shows/' + show.show + '.json').success(function(data){
                console.log("Show has been deleted!")
            });
        }

    }
    o.deleteAllShows = function (event) {
        console.log(event);
        return $http.post('/shows/delete_all.json', event).success(function(data){
            console.log("All shows has been deleted!")
        })
    }
    o.changeShowTime = function(shows) {
        console.log(shows);
        return $http.post('/shows/change_show_time.json', shows).success(function(data){
            console.log(data, 'Shows has been updated!');
        })
    }
return o;
}])
