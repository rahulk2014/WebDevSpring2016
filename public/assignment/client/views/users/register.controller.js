/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService) {

        $scope.error = null;
        $scope.register = function(user) {

            if (null == user) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.confirmPassword) {
                $scope.error = "Please provide a password";
                return;
            }
            if (user.password != user.confirmPassword) {
                $scope.error = "Passwords must match";
                return;
            }
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.error = "User already exists";
                return;
            }
            UserService.createUser($scope.user, function (newUser) {
                UserService.setCurrentUser(newUser);
            });

            //Navigate to the profile page
            $location.url("/profile");

        }
    }
})();