
"use strict";
(function () {

    angular
        .module("SongsForYouApp")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController ( $rootScope, UserService) {
        var vm = this;
        vm.playlists = null;
        vm.deleteplaylist = deleteplaylist;

        function init() {
            vm.user = UserService.getUser();
            vm.playlists = vm.user.playlists;
        }
        init();

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