/**
 * Created by rahul on 4/19/16.
 */
"use strict";

(function(){
    var app = angular.module("SongsForYouApp");

    app.controller("SearchController", SearchController);

    function SearchController($routeParams) {
        console.log("In Search Controller");
        var vm = this;
        var query = $routeParams.query;
        console.log(query);
    }
})();
