/**
 * Created by rahul on 2/23/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileControllerFunction);

    function profileControllerFunction($scope, $rootScope, UserService) {
        UserService.getCurrentUser().then(
            function (response){
                console.log("give me the current logged user");
                console.log(response.data);
                UserService.setCurrentUser(response.data);
                $scope.user = response.data;

            });


        $scope.profile = $scope.user;



        $scope.update = function update(profile) {
            console.log("In update");
            if(!profile.username || profile.username == null){
                $scope.error = "Please enter username";
                return;
            }
            if(!profile.firstName || profile.firstName == null){
                $scope.error = "Please enter firstName";
                return;
            }
            if(!profile.lastName || profile.lastName == null){
                $scope.error = "Please enter lastName";
                return;
            }
            UserService.updateUser($scope.profile._id, profile)
                .then(function(response){
                    if(response.data) {
                        $scope.message = "Successfully Updated";
                        $scope.profile = response.data;
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                    else {
                        $scope.error = "Unable to update";
                    }
                });
        };
    }
})();