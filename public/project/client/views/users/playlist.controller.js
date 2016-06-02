
"use strict";
(function () {

    angular
        .module("SongsForYouApp")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController ($rootScope, UserService) {
        var vm = this;
        vm.playlists = null;
        vm.deleteplaylist = deleteplaylist;
        vm.deleteSong = deleteSong;

        function init() {
            vm.user = UserService.getUser();
            vm.playlists = vm.user.playlists;
            console.log(vm.playlists[0].songs);
        }
        init();

        function deleteSong(playlistId,songId) {
            UserService.deleteSong(playlistId,songId,$rootScope.currentUser._id)
                .then(function(users){
                    vm.message = "Song Deleted";
                    UserService.getplaylist(vm.user._id)
                        .then(function(users){
                            vm.playlists = users.data.playlists;
                        }, function(err){
                            console.log("unable to load playlists");
                        });
                }, function(err){
                    console.log("Unable to delete song")
                })
        }

        function deleteplaylist(playlistId) {
            UserService.deleteplaylist(playlistId, $rootScope.currentUser._id)
                .then(function(users) {
                    vm.message = "Playlist Deleted";
                    UserService.getplaylist(vm.user._id)
                        .then(function(users){
                            vm.playlists = users.data.playlists;

                        }, function(err){
                            console.log("unable to load playlists");
                        });
                }, function(err){
                    console.log("Unable to delete playlist");
                })
        }
    }
})();