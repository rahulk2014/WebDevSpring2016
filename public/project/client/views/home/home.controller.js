/**
 * Created by rahul on 3/25/16.
 */
"use strict";

(function(){
    angular
        .module("SongsForYouApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location) {
        console.log("In Home controller");
        $scope.$location = $location;

        $scope.searchSpanishFlamenco = function() {
            console.log("In searchSpanishFlamenco");
        }
    }
})();