/**
 * Created by rahul on 2/27/16.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile", {
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
