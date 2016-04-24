/**
 * Created by rahul on 4/19/16.
 */
"use strict";

(function(){
    var app = angular.module("SongsForYouApp");

    app.controller("SearchController", SearchController);

    function SearchController($scope, $location) {
        console.log("In Search Controller");
        $scope.$location = $location;
    }
})();
