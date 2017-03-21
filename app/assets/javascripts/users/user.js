angular.module('flapperNews').factory('users', ['$http', function($http){
    var o = {
        users: [
        ]
    };

    o.getUser = function(id) {
        console.log(id)
        return $http.get('/users/' + id ).then(function(res){
            //return res.data;
            angular.copy(res.data, o.users);
        });
    };

    return o;
}])