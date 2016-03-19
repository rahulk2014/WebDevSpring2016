/**
 * Created by rahul on 2/23/16.
 */
"user strict";

(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {

        $scope.error = null;

        $scope.login = function login(user) {
                            UserService.findUserByCredentials(user.username, user.password)
                                .then(function(response){
                                   var result = response.data;
                                   if(result != null) {
                                       $rootScope.currentUser = result;
                                       //UserService.setCurrentUser(result);
                                       $location.url("/profile");
                                   } else {
                                       $scope.error = "User not present";
                                   }
                           });
        };
    }

})();
