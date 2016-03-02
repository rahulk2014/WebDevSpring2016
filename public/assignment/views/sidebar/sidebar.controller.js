/**
 * Created by rahul on 3/2/16.
 */
"use strict";

(function() {

    console.log("In Sidebar before function");
    angular
        .module("FormBuilderApp")
        .controller("SideBarController", sidebarController);
    console.log("In Sidebar before function");
    function sidebarController($scope, $location) {
        console.log("In SideBar Controller");
        $scope.$location = $location;
    }
})();