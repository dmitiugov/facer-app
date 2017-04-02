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
    o.getUserForEdit = function(id) {
        //console.log(id);
        return $http.get('/users/' + id ).then(function(res){
            //console.log(res)
            return res.data
        });
    };
    o.edit = function(user) {
        //console.log(user);
        return $http.put('/users/'+ user.id + '.json', user).success(function(data){
            return data;
        });
    }

    return o;
}])