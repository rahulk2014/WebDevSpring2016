/**
 * Created by rahul on 2/23/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileControllerFunction);

    function profileControllerFunction($scope, UserService) {
        $scope.profile = UserService.getCurrentUser();
        $scope.update = update;

        function update() {
            UserService.setCurrentUser($scope.profile);
        }
    }
})();