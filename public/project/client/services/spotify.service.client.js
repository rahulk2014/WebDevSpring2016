/**
 * Created by rahul on 4/24/16.
 */
(function () {
    angular
        .module("SongsForYouApp")
        .factory("SpotifyService", SpotifyService);

    function SpotifyService($http) {

        var api = {
            findDataByQuery : findDataByQuery
        }

        return api;

        // Return the results obtained from SPotify
        function findDataByQuery(query) {
            return $http.get("/api/project/search/" + query);
        }
    }


})();