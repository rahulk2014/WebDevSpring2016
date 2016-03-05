/**
 * Created by rahul on 3/3/16.
 */
"use strict";

(function(){
    var app = angular.module("MadScienceApp");

    app.controller("HomeController", homeController);

    <!-- Set the location variable to scope-->
    function homeController($scope, $location) {
        console.log("In main Controller");
        $scope.$location = $location;
    }
})();
