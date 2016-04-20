/**
 * Created by rahul on 4/19/16.
 */
"use strict";

(function(){
    var app = angular.module("SongsForYouApp");

    app.controller("MainController", MainController);

    function MainController($scope, $location) {
        console.log("In main Controller");
        $scope.$location = $location;
    }
})();
