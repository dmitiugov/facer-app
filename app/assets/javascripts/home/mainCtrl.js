angular.module('flapperNews').controller('MainCtrl', [
'$scope',
'posts',
    'Upload',
    'Auth',
    '$state',
function($scope, posts, Upload, Auth, $state){
    Auth.currentUser().then(function(user) {
        // User was logged in, or Devise returned
        // previously authenticated session.
        $scope.user_name = user.username;
    }, function(error) {
        // unauthenticated error
        $state.go('login');
    });
  $scope.test = 'Hello world!';
    //console.log($scope.test)
	$scope.posts = posts.posts;
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  posts.create({
	    title: $scope.title,
	    link: $scope.link,
	  });
	  $scope.title = '';
	  $scope.link = '';
	};

	$scope.incrementUpvotes = function(post) {
	  posts.upvote(post);
	};

}])