/**
 * Created by rahul on 2/23/16.
 */
"use strict";

(function() {

    angular
        .module("SongsForYouApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService) {

        var vm = this;
        vm.login = login;
        vm.passportLogin = passportLogin;

        function init() {
        }

        init();

        vm.message = null;

        function login(user) {

            UserService.findUserByCredentials(user.username, user.password)
                .then(
                    function (user) {
                        if (user.data != null) {
                            UserService.setUser(user.data);
                            $location.url('/');
                            console.log($rootScope.currentUser);
                        }
                        else {
                            vm.message = "Invalid Username or Password";
                        }
                    },
                    function (err) {
                        vm.message = "Login Failed, Please try again";
                    }
                );
        }

        function passportLogin(user) {

            if (!angular.isObject(user)) {
                vm.message = "Fields cannot be empty";
            } else {
                UserService.userLogin(user)
                    .then(function (user) {
                        if (user.data != null) {
                            UserService.setUser(user.data);
                            $location.url('/');
                            console.log($rootScope.currentUser);
                        }
                        else {
                            vm.message = "Invalid Username or Password";
                        }

                    }, function (err) {
                        vm.message = "User does not exist";
                    })
            }
        }
    }

})();
