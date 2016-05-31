/**
 * Created by rahul on 3/25/16.
 */
"use strict";
(function(){
    angular.module("SongsForYouApp")
        .config(function($routeProvider){

            $routeProvider.
                when("/",{
                    templateUrl : "views/home/home.view.html",
                    controller : "HomeController"
                })
                .when("/admin",{
                    templateUrl:"views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/login",{
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/searchDetail", {
                    templateUrl: "views/search/searchDetailPage.view.html",
                    controller: "SearchDetailController",
                    controllerAs : "model"
                })
                .when("/search/:query", {
                    templateUrl: "views/search/searchPage.view.html",
                    controller: "SearchController",
                    controllerAs : "model"
                })
                .otherwise({
                    redirectTo: "/"
                });

        })
})();