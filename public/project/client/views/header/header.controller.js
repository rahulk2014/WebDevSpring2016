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
        vm.createPlaylist = createPlaylist;
        vm.close = close;
        vm.successMessage = null;

        function init() {
            vm.$location = $location;
            vm.user = UserService.getUser();
            console.log(vm.user);
        }
        init();

        function close() {
            vm.successMessage = null;
        }

        function createPlaylist(playlistName) {

            console.log("Inside createplaylist controller");
            UserService
                .createPlaylist(playlistName,$rootScope.currentUser)
                .then(function(response) {
                    vm.playlistName = null;
                    vm.successMessage="Playlist Created";
                    console.log("In success createplaylist");
                }, function(err) {
                    console.log("unable to create a playlist");
                });
        }

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