angular.module('flapperNews').factory('artists', ['$http', function($http){
    var o = {
        artists: [
        ],
        artist: [
        ],
    };
    o.getAll = function() {
        return $http.get('/artists.json').success(function(data){
            angular.copy(data, o.artists);
        });
    };
    o.destroy = function(special_guest) {
        return $http.delete('/artists/' + artist.id + '.json').success(function(data){
            console.log("Artist has been deleted!")
        });
    };
    o.get = function(id) {
        return $http.get('/artists/' + id + '.json').then(function(res){
            angular.copy(res.data, o.artist);
        });
    };
    return o;
}])