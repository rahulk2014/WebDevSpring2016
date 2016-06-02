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
                    controller : "HomeController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/admin",{
                    templateUrl:"views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/login",{
                    templateUrl:"views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs : "model"
                })
                .when("/register",{
                    templateUrl:"views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs : "model"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs : "model",
                    resolve: {
                        checkLoggedIn: checkLoggedin
                    }
                })
                .when("/playlist", {
                    templateUrl: "views/users/playlist.view.html",
                    controller: "PlaylistController",
                    controllerAs : "model",
                    resolve: {
                        checkLoggedIn: checkLoggedin
                    }
                })
                .when("/find", {
                    templateUrl: "views/users/find.view.html",
                    controller: "FindUserController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedin
                    }
                })
                .when("/api/profile/:username/profile", {
                    templateUrl: "views/users/friend.profile.view.html",
                    controller: "FriendProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedin
                    }
                })
                .when("/searchDetail/:songId", {
                    templateUrl: "views/search/searchDetailPage.view.html",
                    controller: "SearchDetailController",
                    controllerAs : "model"
                })
                .when("/search/:query", {
                    templateUrl: "views/search/searchPage.view.html",
                    controller: "SearchController",
                    controllerAs : "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get("/api/project/loggedin").success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();