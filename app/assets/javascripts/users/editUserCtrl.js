angular.module('flapperNews').controller('editUserCtrl', [
    '$scope',
    'Auth',
    'Upload',
    'toastr',
    'users',
    function($scope, Auth, Upload, toastr, users){

        $scope.upload = function (file, id) {
            $scope.upload = Upload.upload({
                url: '/files/add_file_to_user.json',
                method: 'POST',
                fields: {
                    id: id,
                    file: file,
                    fileFormDataName: 'user[image]'
                },
            }).then(function(resp){
                console.log(resp);
                toastr.success(resp.data.name + " изменен")
            })
        }
        $scope.title = 'Редактировать пользователя'
        Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            var id = user.username
            users.getUserForEdit(id).then(function (resp) {
                //console.log(resp);
                //console.log(resp[0]);
                var user = resp[0];
                $scope.name = user.name
                $scope.surname = user.surname
                $scope.file = user.file
                $scope.id = user.id
            })
        }, function(error) {
            toastr.error(error)
        });
        $scope.editUser = function() {
            users.edit({
                id: $scope.id,
                name: $scope.name,
                surname: $scope.surname,
            }).then(function (response) {
                console.log(response.config.data);
                var id = response.config.data.id
                if ($scope.file && $scope.file != '/images/missing.png' && $scope.file.$ngfBlobUrl) {
                    $scope.upload($scope.file, id);
                } else {
                    toastr.success(response.config.data.name + " изменен")
                }
            })
        }
    }])