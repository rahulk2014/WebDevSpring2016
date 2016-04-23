/**
 * Created by rahul on 3/1/16.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserServiceFunction);

    function UserServiceFunction($rootScope, $http) {

        var model = {
            findUserByUsername : findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser:getCurrentUser,
            login: login,
            logout: logout,

        }

        return model;


        function login(credentials) {
            return $http.post("/api/assignment/user/login", credentials);
        }

        function logout () {
            return $http.post("/api/assignment/logout");
        }

        function setCurrentUser (user) {
            $rootScope.loggedUser = user;
        }

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            var newUser = {
                username: user.username,
                password : user.password,
                email : user.email
             };
            return $http.post("/api/assignment/user/",newUser);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            console.log(user);
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function getCurrentUser () {
            return $http.get("/api/assignment/user/loggedin");
        }
    }
})();