/**
 * Created by rahul on 4/19/16.
 */
"use strict";

(function(){
    var app = angular.module("SongsForYouApp");

    app.controller("SearchController", SearchController);

    function SearchController($routeParams, SpotifyService) {
        console.log("In Search Controller");
        var vm = this;
        var query = $routeParams.query;
        vm.query = null;
        console.log(query);

        if(query != null) {
            if(query == "")
                return;
            searchTracks(query);
        }

        vm.searchTracks = searchTracks;

        function searchTracks(query) {
            SpotifyService.findTracks(query)
                .then(renderResults, renderFailure);
        }

        function renderResults(){
            console.log("Successfully fetched results");
        }

        function renderFailure(){
            console.log("Failed to fetch results")
        }

    }
})();
