/**
 * Created by rahul on 3/3/16.
 */
/**
 * Created by rahul on 2/27/16.
 */
"use strict";
(function(){
    angular.module("MadScienceApp")
        .config(function($routeProvider){

            $routeProvider.
                when("/",{
                    templateUrl : "views/home/madScienceHome.view.html",
                    controller : "HomeController"
                })
                //.when("/admin",{
                //    templateUrl:"views/admin/admin.view.html",
                //    controller: "AdminController"
                //})
                //.when("/forms",{
                //    templateUrl:"views/forms/forms.view.html",
                //    controller: "FormController"
                //})
                //.when("/login",{
                //    templateUrl:"views/users/login.view.html",
                //    controller: "LoginController"
                //})
                //.when("/register",{
                //    templateUrl:"views/users/register.view.html",
                //    controller: "RegisterController"
                //})
                //.when("/profile", {
                //    templateUrl: "views/users/profile.view.html",
                //    controller: "ProfileController"
                //})
                .otherwise({
                    redirectTo: "/"
                });

        })



})();