/**
 * Created by rahul on 3/25/16.
 */
(function() {

    angular
        .module("SongsForYouApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        console.log("In Header Controller");

    }
})();