angular.module('flapperNews',
    ['ngAnimate',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ui.calendar',
    'templates',
    'Devise',
    'datePicker',
    'ngFileUpload',
    'ui.select',
    'ui.mask',
    'toastr']).config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
      .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', 
          function(posts){
            return posts.getAll();
          }]
		  }
    })

		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: 'posts/_posts.html',
		  controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }      
    })

    .state('events', {
      url: '/events',
      templateUrl: 'events/_events.html',
      controller: 'EventsCtrl',
      resolve: {
        eventPromise: ['events', 
          function(events){
            return events.getAll();
          }]
      }
    })

      .state('events-show', {
          url: '/events/{id}',
          templateUrl: 'events/_show-event.html',
          controller: 'ShowEventCtrl',
          resolve: {
              post: ['$stateParams', 'events', function($stateParams, events) {
                  return events.get($stateParams.id);
              }]
          }
      })


      .state('events-edit', {
          url: '/events/edit/{id}',
          templateUrl: 'events/_new-event.html',
          controller: 'EditEventCtrl',
          resolve: {
              post: ['$stateParams', 'events', function($stateParams, events) {
                  return events.get($stateParams.id);
              }]
          }
      })

      .state('new-event', {
          url: '/new-event',
          templateUrl: 'events/_new-event.html',
          controller: 'NewEventCtrl',
          resolve: {
              eventPromise: ['events',
                  function(events){
                      return events.getAll();
                  }]
          }
      })

      .state('special_guests', {
          url: '/special_guests',
          templateUrl: 'special-guests/_special-guests.html',
          controller: 'specialGuestsCtrl',
          resolve: {
              specialGuestsPromise: ['special_guests',
                  function(special_guests){
                  //console.log("!!!")
                      return special_guests.getAll();
                  }]
          }
      })

      .state('show-special_guests', {
          url: '/special_guests/{id}',
          templateUrl: 'special-guests/_show-special-guest.html',
          controller: 'showSpecialGuestCtrl',
          resolve: {
              post: ['$stateParams', 'special_guests', function($stateParams, special_guests) {
                  return special_guests.get($stateParams.id);
              }]
          }
      })

      .state('new-special_guests', {
          url: '/new-special_guests',
          templateUrl: 'special-guests/_new-special-guest.html',
          controller: 'newSpecialGuestCtrl',
          resolve: {
              specialGuestsPromise: ['special_guests',
                  function(special_guests){
                      return special_guests.getAll();
                  }]
          }
      })

      .state('edit-special_guests', {
          url: '/speical_guests/edit/{id}',
          templateUrl: 'special-guests/_new-special-guest.html',
          controller: 'editSpecialGuestCtrl',
          resolve: {
              post: ['$stateParams', 'special_guests', function($stateParams, special_guests) {
                  return special_guests.get($stateParams.id);
              }]
          }
      })

      .state('artists', {
          url: '/artists',
          templateUrl: 'artists/_artists.html',
          controller: 'artistsCtrl',
          resolve: {
              artistsPromise: ['artists',
                  function(artists){
                      return artists.getAll();
                  }]
          }
      })

      .state('show-artists', {
          url: '/artists/{id}',
          templateUrl: 'artists/_show-artist.html',
          controller: 'showArtistCtrl',
          resolve: {
              post: ['$stateParams', 'artists', function($stateParams, artists) {
                  return artists.get($stateParams.id);
              }]
          }
      })

      .state('edit-artists', {
          url: '/artists/edit/{id}',
          templateUrl: 'artists/_new-artist.html',
          controller: 'editArtistCtrl',
          resolve: {
              post: ['$stateParams', 'artists', function($stateParams, artists) {
                  return artists.get($stateParams.id);
              }]
          }
      })

      .state('new-artists', {
          url: '/new-artists',
          templateUrl: 'artists/_new-artist.html',
          controller: 'newArtistCtrl'
      })


    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });
  $urlRouterProvider.otherwise('home');
}]);