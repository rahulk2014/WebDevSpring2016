/**
 * Created by rahul on 5/30/16.
 */
"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("SearchDetailController", SearchDetailController);

        function SearchDetailController($routeParams, SpotifyService) {
            console.log("In SearchDetail Controller");
            var vm = this;
            vm.searchSong = searchSong;
            vm.searchDetailResult = null;

            var songId = $routeParams.songId;
            console.log(songId);
            function init() {
            }
            init();

            if(songId != null) {
                if(songId == "")
                    return;
                searchSong(songId);
            }

            /**
             * Function that returns results from the server.
             * @param songId
             */
            function searchSong(songId) {
                SpotifyService.findSong(songId)
                    .then(renderResults, renderFailure);
            }
            function renderResults(response) {
                console.log("Inside renderResults");
                vm.searchDetailResult = response.data;
                //console.log(vm.searchDetailResult.spotify_uri);
                console.log(vm.searchDetailResult.imageURL);
            }
            function renderFailure(){
                console.log("Failed to fetch results.");
            }
        }
})();
