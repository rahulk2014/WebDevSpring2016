/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function() {

    angular
        .module("SongsForYouApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.message = null;
        //var user = $scope.user;
        $scope.login = function (user) {
                            UserService.findUserByCredentials(user.username, user.password)
                                .then(
                                    function(user){
                                        if(user.data != null) {
                                            $rootScope.currentUser = user.data;
                                            $location.url('/profile');
                                        } else {
                                            $scope.message = "User Not Found"
                                        }

                                    },
                                    function(error) {
                                        console.log("Error Function");
                                    });
                        };
    }

})();