angular.module('flapperNews').controller('MainCtrl', [
'$scope',
'posts',
    'Upload',
    'Auth',
function($scope, posts, Upload, Auth){
    //console.log(Upload)
    //console.log(Auth);
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