angular.module('flapperNews').factory('giphy', ['$http', 'toastr', function($http, toastr){
    var o = {
        giphy: [],
    };
    o.getGiphy = function() {
        return $http.get('http://api.giphy.com/v1/gifs/search?q=techno&api_key=dc6zaTOxFJmzC');
    }
    //factory get giphy
    return o;
}])