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
            UserService.login(user).then(
                function (response){
                    console.log(response);
                    if(response.data == null){
                        $scope.message = "Username and Password does not match, new User please register";
                    }
                    else{
                        console.log("User exists");
                        UserService.setCurrentUser(response.data);
                        console.log(response.data);
                        $location.url("/profile");
                    }

                });
                        };
    }

})();
