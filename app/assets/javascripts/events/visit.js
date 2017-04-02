angular.module('flapperNews').factory('visits', ['$http', 'toastr', function($http, toastr){
    var o = {
        visits: [

        ],
    }
    o.changeSpecialInside = function(visit) {
        console.log(visit)
        return $http.put('/visits/'+ visit.id + '.json', visit).success(function(data){
            console.log("Status has been updated!")
        });
    };
    o.createVisit = function(visits) {
        //console.log(visits);
        return $http.post('/visits.json', visits).success(function (data) {
            console.log(data);
        })
    }
    o.deleteVisit = function(visit) {
        return $http.delete('/visits/' + visit.visit.id + '.json').success(function (data) {
            console.log("Visit has been deleted!")
        });
    }
    o.checkVisit = function (visit) {
        console.log(visit);
        return $http.post('/visits/check_visit.json', visit).success(function (data) {
            //console.log(data);
        })
    }
    o.deleteAllVisits = function (event) {
        console.log(event);
        return $http.post('/visits/delete_all.json', event).success(function(data){
            console.log("All visits has been deleted!")
        })
    }
    o.selectAllVisits = function (event) {
        console.log(event);
        return $http.post('/visits/select_all.json', event).success(function(data){
            console.log("All visits has been selected!")
        })
    }
    return o;
}])