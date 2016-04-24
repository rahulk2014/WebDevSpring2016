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
            search(query);
        }

        vm.search = search;

        function search(query) {
            SpotifyService.finddataByQuery(query)
                .then(renderResults, renderFailure);
        }

    }
})();
