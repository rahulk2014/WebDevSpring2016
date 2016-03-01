/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginControllerFunction);

    function LoginControllerFunction($scope, $location, UserService) {

        $scope.login = login;
        $scope.$location = $location;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password,
                        function(user_found) {
                            if(user_found) {
                                console.log(user_found);
                                UserService.setCurrentUser(user_found);
                                $location.url("/profile");
                            }
                        });
        }
    }

})();
