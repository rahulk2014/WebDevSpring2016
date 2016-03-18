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
            getCurrentUser:getCurrentUser
        }

        return model;

        function findUserByUsername (username) {
            return $http.get("/api/assignment/user",{params : {username : username}});
        }

        function findUserByCredentials(username, password) {
            console.log("In findUserByCredentials in Client User Service");
           // return $http.get("/api/assignment/user");
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            console.log("Inside Client User Service");
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            var newUser = {
                username: user.username,
                password : user.password,
                email : user.email
             };
            return $http.post("api/assignment/"+newUser);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/:"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/"+user+"/:"+userId);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }
})();