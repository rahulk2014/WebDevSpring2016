/**
 * Created by rahul on 4/19/16.
 */
"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, SpotifyService) {

        console.log("In Search Controller");
        var vm = this;
        vm.searchTracks = searchTracks;
        vm.searchResult = null;

        var query = $routeParams.query;


        function init() {

        }

        init();

        if(query != null) {
            if(query == "")
                return;
            searchTracks(query);
        }

        /**
         * Function that returns results from the server.
         * @param query
         */
        function searchTracks(query) {
            SpotifyService.findTracks(query)
                .then(renderResults, renderFailure);
        }

        function renderResults(response){
            console.log(response.data);
            vm.searchResult = response.data;
            console.log(vm.searchResult[0].artistname);
        }

        function renderFailure(){
            console.log("Failed to fetch results")
        }

    }
})();
