
"use strict";
(function () {

    angular
        .module("SongsForYouApp")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController ( $rootScope, UserService) {
        var vm = this;
        vm.playlists = null;

        function init() {
            vm.user = UserService.getUser();
            vm.playlists = vm.user.playlists;
             //UserService.getplaylist(vm.user._id)
             //    .then(function(playlists){
             //       vm.playlists = playlists;
             //    }, function(err){
             //        console.log("unable to load playlists");
             //    });
        }
        init();
    }
})();