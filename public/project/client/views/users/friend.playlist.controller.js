"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("FriendPlaylistController", FriendPlaylistController);

    function FriendPlaylistController ($routeParams, UserService) {
        console.log("IN FriendPlaylistController");
        var vm = this;
        vm.profileUserName = $routeParams.profileUserName;
        console.log(vm.profileUserName);
        function init() {
            UserService.findUserByUsername(vm.profileUserName)
                .then(function(user){
                    vm.user = user.data;
                    console.log(vm.user);
                }, function (err){
                    console.log("error");
                });
        }
        init();
    }
})();