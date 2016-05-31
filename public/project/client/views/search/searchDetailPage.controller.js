/**
 * Created by rahul on 5/30/16.
 */
"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("SearchDetailController", SearchDetailController);

        function SearchDetailController($routeParams) {
            console.log("In SearchDetail Controller")
        }
})();
