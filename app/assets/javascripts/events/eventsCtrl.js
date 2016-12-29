angular.module('flapperNews').controller('EventsCtrl', [
'$scope',
'events',
    'Auth',
    '$compile',
    'uiCalendarConfig',
    '$timeout',
    '$window',
function($scope, events, Auth, $compile, uiCalendarConfig, $timeout, $window){
    $scope.auth = Auth.isAuthenticated()
    $scope.isCollapsed = true;
	$scope.events=events
    $scope.deleteEvent = function(id){
        events.destroy({
            id: id,
        }).then(function () {
            //$window.location.reload();
            events.getAll();
        });
    }


//console.log($scope.uiConfig.calendar)




    $scope.eventy = [{
       /* events: [{
            title: "Do some development",
            start: '2016-09-12',
            end: '2016-09-12'

        }, {
            title: "Wave",
            start: '2016-09-09',
            end: '2016-09-09'
        }],*/
        //color: 'green',
        //textColor: 'yellow'
    }];
    $scope.eventy[0].events = $scope.events.events
    for (var i=0; i<$scope.eventy[0].events.length; i++) {
        $scope.eventy[0].events[i].start = $scope.eventy[0].events[i].date;
        $scope.eventy[0].events[i].end = $scope.eventy[0].events[i].date;
        $scope.eventy[0].events[i].title = $scope.eventy[0].events[i].name;
    }
    $scope.eventy[0].color = 'yellow';
    $scope.eventy[0].textColor = 'black';
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: true,
            header:{
                left: 'month basicWeek basicDay agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
    $scope.renderCalender = function() {
        $timeout(function(){
            uiCalendarConfig.calendars.myCalendar.fullCalendar('render')
        }, 200);
    }
}])