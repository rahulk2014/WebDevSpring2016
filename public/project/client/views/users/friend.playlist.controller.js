"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("FriendPlaylistController", FriendPlaylistController);

    function FriendPlaylistController ($routeParams, UserService) {
        var vm = this;
        vm.profileUserName = $routeParams.profileUserName;
        function init() {
            UserService.findUserByUsername(vm.profileUserName)
                .then(function(user){
                    vm.user = user.data;
                }, function (err){
                    console.log("error");
                });
        }
        init();
    }
})();