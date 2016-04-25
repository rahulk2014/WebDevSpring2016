/**
 * Created by rahul on 4/24/16.
 */
(function () {
    angular
        .module("SongsForYouApp")
        .factory("SpotifyService", SpotifyService);

    function SpotifyService($http) {

        console.log("Inside spotify client service");

        var api = {
            findTracks: findTracks
        }
        return api;

        // Return the results obtained from SPotify
        function findTracks(query) {
            console.log("Inside findSongsByArtist() in client service");
            return $http.get("/api/project/search/" + query);
        }
    }
})();