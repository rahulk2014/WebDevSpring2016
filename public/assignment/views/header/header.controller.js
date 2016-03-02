/**
 * Created by rahul on 2/23/16.
 */
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location) {
        console.log("In Header Controller");
        $scope.$location = $location;
    }
})();