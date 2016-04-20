/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function(){

    angular
        .module("SongsForYouApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService) {

        $scope.register = function(user) {

            if (user == null) {
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
            UserService.findUserByUsername(user.username)
                .then(function(userFound){
                    if(userFound.data == null) {
                        UserService.createUser(user)
                            .then(function(users){
                                UserService.findUserByUsername(user.username)
                                    .then(function(userFoundAgain){
                                        UserService.setCurrentUser(userFoundAgain.data);
                                        $location.url('/profile');
                                    }, function(error){
                                        $scope.error = "Unable to find existing user name";
                                    })
                            }, function(error) {
                                $scope.error = "Unable to create a new user";
                            });
                    } else {
                        $scope.error = "User already exists";
                    }
                }, function(error) {
                    console.log("Unable to fetch username");
                });

        }
    }
})();