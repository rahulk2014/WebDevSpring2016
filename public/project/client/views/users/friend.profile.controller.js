
"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("FriendProfileController", FriendProfileController);

    function FriendProfileController ($routeParams, UserService) {

        var vm = this;
        vm.profileUserName = $routeParams.username;

        function init() {
            UserService.findUserByUsername(vm.profileUserName)
                .then(function(user){
                    vm.user = user.data;
                }, function (err){

                });
        }
        init();
    }
})();