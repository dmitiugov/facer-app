angular.module('flapperNews').factory('accaunt', ['$http', 'toastr', function($http, toastr){
    var o = {
        accaunt: [],
    };
    o.getAccaunt = function() {
        //return $http.get('http://api.giphy.com/v1/gifs/search?q=techno&api_key=dc6zaTOxFJmzC');
        return $http.get("/accaunts/get_all_accaunts.json");
    }
    //factory get giphy
    return o;
        }
    ]
)