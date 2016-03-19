/**
 * Created by rahul on 2/23/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileControllerFunction);

    function profileControllerFunction($scope, $rootScope, UserService) {
        console.log("PROFILE1 = " + $rootScope.currentUser);
        $scope.profile = $rootScope.currentUser;
        console.log("PROFILE2 = " + $scope.profile);

        if($scope.profile == null) {
            console.log("DAMN AGAIN");
        }
        //$scope.error = null;

        $scope.update = function update(profile) {
            console.log("In update");
            if(!profile.username || profile.username == null){
                //$scope.error = "Please enter username";
                return;
            }
            if(!profile.firstName || profile.firstName == null){
                //$scope.error = "Please enter firstName";
                return;
            }
            if(!profile.lastName || profile.lastName == null){
                //$scope.error = "Please enter lastName";
                return;
            }
            UserService.updateUser($scope.profile._id, profile)
                .then(function(response){
                    console.log(response.data);
                    if(response.data)
                        UserService.setCurrentUser(response.data);
                    else {
                        //$scope.error = "Unable to update";
                    }
                });
        };
    }
})();