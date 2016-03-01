/**
 * Created by rahul on 2/27/16.
 */
"use strict";

(function(){
    var app = angular.module("FormBuilderApp", []);

    app.controller("MainController", MainController);

    <!-- Set the location variable to scope-->
    function MainController($scope, $location) {
        console.log("In main Controller");
        $scope.$location = $location;

    }
})();
