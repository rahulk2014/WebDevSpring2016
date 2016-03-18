/**
 * Created by rahul on 3/1/16.
 */
"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserServiceFunction);

    function UserServiceFunction($rootScope, $http) {



        //var model = {
        //        users : [
        //        {
        //            "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
        //            "username": "alice", "password": "alice", "roles": ["student"]
        //        },
        //        {
        //            "_id": 234, "firstName": "Bob", "lastName": "Hope",
        //            "username": "bob", "password": "bob", "roles": ["admin"]
        //        },
        //        {
        //            "_id": 345, "firstName": "Charlie", "lastName": "Brown",
        //            "username": "charlie", "password": "charlie", "roles": ["faculty"]
        //        },
        //        {
        //            "_id": 456, "firstName": "Dan", "lastName": "Craig",
        //            "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
        //        },
        //        {
        //            "_id": 567, "firstName": "Edward", "lastName": "Norton",
        //            "username": "ed", "password": "ed", "roles": ["student"]
        //        }
        //    ],
        //
        //    findUserByCredentials :findUserByCredentials,
        //    findUserByUsername : findUserByUsername,
        //    findAllUsers : findAllUsers,
        //    createUser : createUser,
        //    deleteUserById :deleteUserById,
        //    updateUser : updateUser,
        //    setCurrentUser : setCurrentUser,
        //    getCurrentUser : getCurrentUser
        // };
        //
        //return model;

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password, callback) {
            for (var user in model.users) {
                if (model.users[user].username === username && model.users[user].password === password)
                    callback(model.users[user]);
            }
            callback(null);
        }

        function findAllUsers() {
            console.log("Inside Client User Service");
            return $http.get("/api/assignment/user");
            //callback(model.users);
        }

        function createUser(user, callback) {
            var newUser = {
                username: user.username,
                password : user.password,
                email : user.email
             };

            model.users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            var user_found = model.users[userId];
            if (null != user_found)
                users.splice(model.users.indexOf(user), 1);
            callback(model.users);
        }

        function updateUser(userId, user, callback) {
            var user_found = model.users[userId];
            if (userId != null) {
                user_found.username = user.username;
                user_found.firstName = user.firstName;
                user_found.lastName = user.lastName;
                user_found.password = user.password;
                user_found.email = user.email;
                callback(user_found);
            } else {
                callback(null);
            }
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }
})();