angular.module('flapperNews').factory('artists', ['$http', 'toastr', '$sce', function($http, toastr, $sce){
    var o = {
        artists: [
        ],
        artist: [
        ],
    };
    o.getAll = function() {
        return $http.get('/artists.json').success(function(data){
            angular.copy(data, o.artists);
        }).error(function (data, status, headers, config) {
            toastr.error('<a href="#/login"> Go to Log In Page!</a>', 'Auth Error ' + status, {
                allowHtml: true
            });
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
    o.edit = function(artist) {
        console.log(artist)
        return $http.put('/artists/'+ artist.id + '.json', artist).success(function(data){
            return data
            console.log("Artist has been updated!")
        });
    };
    return o;
}])