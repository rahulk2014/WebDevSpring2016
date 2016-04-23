/**
 * Created by rahul on 2/27/16.
 */
"use strict";
(function(){
    angular.module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider.when("/", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/field", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    var loggedInCheck = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();
        console.log("Inside loggedInCheck()");
        $http.get("/api/assignment/user/loggedin").success(function(user){
            // Check for logged In success and failure.
            if(user) {
                $rootScope.loggedUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url("/home");
            }
        });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        console.log("Inside checkCurrentUser");
        $http.get("/api/assignment/user/loggedin").success(function(user)
        {
            $rootScope.errorMessage = null;
            if (user)
            {
                $rootScope.loggedUser = user;

            }
            deferred.resolve();
        });
        return deferred.promise;
    };
})();