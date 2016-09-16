angular.module('flapperNews', ['ui.router', 'templates', 'Devise', 'datePicker']).config([
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
		  }})

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
    
  //$urlRouterProvider.otherwise('login');
}]);