/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function() {

    angular
        .module("FormBuilderApp")
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

                                        } else {
                                            $scope.message = "User Not Found"
                                        }
                                        $location.url('/profile');
                                    },
                                    function(error) {
                                        console.log("Error Function");
                                    });
                        };
    }

})();
