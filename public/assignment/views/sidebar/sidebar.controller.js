/**
 * Created by rahul on 3/2/16.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .controller("SideBarController", sidebarController);
    function sidebarController($scope, $location) {
        console.log("In SideBar Controller");
        $scope.$location = $location;
    }
})();