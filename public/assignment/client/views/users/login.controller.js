/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $location, UserService) {

        $scope.login = login;
        $scope.$location = $location;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
                       .then(function(response){
                           console.log("In Then of Userservice findUserByCredentials");
                           UserService.setCurrentUser(response.data);
                           $location.url("/profile");
                       });
                        //function(user_found) {
                        //    if(user_found) {
                        //        console.log(user_found);
                        //        UserService.setCurrentUser(user_found);
                        //        $location.url("/profile");
                        //    }
                        //    else{
                        //        console.log("User not found");
                        //    }
                        //});
        }
    }

})();
