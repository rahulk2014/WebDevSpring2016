/**
 * Created by rahul on 3/3/16.
 */
"use strict";

(function(){
    var app = angular.module("MadScienceApp");

    app.controller("MainController", MainController);

    <!-- Set the location variable to scope-->
    function MainController($scope, $location) {
        console.log("In main Controller");
        $scope.$location = $location;
    }
})();
