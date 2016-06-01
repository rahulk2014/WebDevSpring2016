/**
 * Created by rahul on 3/25/16.
 */
"use strict";

(function() {

    angular
        .module("SongsForYouApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $location, $rootScope) {
        var vm = this;
        vm.logout = logout;
        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(user){
                        console.log("logout success");
                        UserService.setUser(null);
                        console.log($rootScope.currentUser);
                        $location.url("/");
                    },
                    function(err){
                        console.log("logout error");
                    });
        }
    }
})();