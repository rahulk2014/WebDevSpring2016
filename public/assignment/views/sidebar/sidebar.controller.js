/**
 * Created by rahul on 3/2/16.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        console.log("In SideBar Controller");
        $scope.$location = $location;
    }
})();