/**
 * Created by rahul on 5/30/16.
 */
"use strict";
(function(){
    angular
        .module("SongsForYouApp")
        .controller("SearchDetailController", SearchDetailController);

        function SearchDetailController($routeParams, $sce, SpotifyService, UserService) {
            console.log("In SearchDetail Controller");


            var vm = this;
            vm.searchSong = searchSong;
            vm.addToPlaylist = addToPlaylist;
            vm.searchDetailResult = null;
            vm.user = UserService.getUser();
            console.log("HEY " + vm.user.playlists[0].playlistName);
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


            //songid : String,
            //    songname: String,
            //    artistname : String,
            //    previewUrl : String
            function addToPlaylist(playlistId,searchDetailResult) {
                //console.log("YO " + playlistName);
                console.log("SEARCH DETAIL " + playlistId);
                console.log(searchDetailResult);
                var newSong = {
                    songid : searchDetailResult.songid,
                    songname : searchDetailResult.trackName,
                    artistname : searchDetailResult.artistname,
                    previewURL : searchDetailResult.previewURL
                }
                UserService.addToPlaylist(vm.user.id, newSong, playlistId)
                    .then(function(user){
                        console.log("Song added succesfully");
                    }, function(err){
                        console.log("Unable to add song.");
                    })

                //UserService.addToPlaylist(playlistName)

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
                vm.searchDetailResult.spotify_uri = "https://embed.spotify.com/?uri=" + vm.searchDetailResult.spotify_uri;
                vm.searchDetailResult.spotify_uri = $sce.trustAsResourceUrl(vm.searchDetailResult.spotify_uri);
                //vm.searchDetailResult.previewURL = vm.searchDetailResult.previewURL + ".mp3";
                vm.searchDetailResult.previewURL = $sce.trustAsResourceUrl(vm.searchDetailResult.previewURL);
                //console.log(vm.searchDetailResult.spotify_uri);
            }
            function renderFailure(){
                console.log("Failed to fetch results.");
            }
        }
})();
