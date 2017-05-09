angular.module('flapperNews').controller('EventsCtrl', [
'$scope',
'events',
    'Auth',
    '$compile',
    'uiCalendarConfig',
    '$timeout',
    '$window',
    '$location',
    '$state',
    'toastr',
    '$cookies',
function($scope, events, Auth, $compile, uiCalendarConfig, $timeout, $window, $location, $state, toastr, $cookies){
    //console.log($cookies);
    var params = {};
    $scope.redirectUrl = '/artists';
    $scope.auth = Auth.isAuthenticated()
    $scope.isCollapsed = true;
	$scope.events=events
    console.log($scope.events);
    $scope.deleteEvent = function(id){
        events.destroy({
            id: id,
        }).then(function () {
            //$window.location.reload();
            //$location.path($scope.redirectUrl);
            $state.reload()
        });
    }


//console.log($scope.uiConfig.calendar)

$scope.moveEventToArchive = function (id) {
    //console.log(id);
    events.moveEventToArchive({
        id: id,
    }).then(function(data){
        $scope.events.events = data.data;
    })

}
    $scope.moveEventFromArchive = function (id) {
        //console.log(id);
        events.moveEventFromArchive({
            id: id,
        }).then(function(data){
            console.log(data);
            $scope.events.events = data.data;
        })

    }
$scope.showArchivedEvents = function (archive) {
    console.log(archive);
    params.archive = archive;
    console.log(params);
    events.showArchivedEvents({
        archive: archive,
    }).then(function(data){
        $cookies.put('module.events.filters.isArchive', params.archive);
        $scope.events.events = data.data;
    })
}


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

    ////выбор даты
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    var weekForward = new Date();
    weekForward.setDate(weekForward.getDate() + 7);
    $scope.today = function() {
        $scope.dt_from = weekAgo;
        $scope.dt_to = weekForward;
    };
    $scope.today();
    console.log($scope.dt_from);
    $scope.clear = function() {
        $scope.dt_from = null;
        $scope.dt_to = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };



    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };




    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);


    $scope.range = [];

    $scope.$watchCollection('[dt_from, dt_to]', function(newValues)
    {
         $scope.range =
            {
                date_from: newValues[0],
                date_to: newValues[1]
            };
         $scope.eventsRangeDates($scope.range)
    });

    $scope.eventsRangeDates = function(range) {
        //console.log(range);
        events.getRangedEvents({
            range: range,
            archive: $scope.archive,
        }).then(function(data){
            $scope.events.events = data.data;
        })
    }

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
    var archive = $cookies.get('module.events.filters.isArchive')
    console.log(archive);
    if (archive == 'true')
        archive = true
    else
        archive = false
    $scope.archive = archive;
    $scope.showArchivedEvents($scope.archive);
}])