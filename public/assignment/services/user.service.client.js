/**
 * Created by rahul on 3/1/16.
 */
"use strict";

(function() {

    angular.module("FormBuilderApp");
           .factory("UserService", UserServiceFunction);

    function UserServiceFunction($rootScope) {

        var users = [
            { "_id":123, "firstName":"Alice",  "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"] },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]   },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]  },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"] },
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]   }
        ];
    }

    function findUserByCredentials(username, password, callback) {
        for(var user in users) {
            if(users[user].username === username && users[user].password === password)
                callback(users[user]);
        }
        callback(null);
    }

    function findAllUsers(callback) {
        callback(users);
    }

    function createUser(user, callback) {
        var newUser = {
            username : user.username;
            password : user.password;

        }

        users.push(newUser);
        callback(newUser);
    }

    function deleteUserById(userId, callback) {
        var user_found = findUserById(userId);

        if(null != user_found)
            users.splice(users.indexOf(user), 1);
        callback(users);
    }

    function updateUser(userId, user, callback) {
        var user_found = findUserById(userId);
        if( userId != null) {
            user_found.username = user.username;
            user_found.firstName = user.firstName;
            user_found.lastName = user.lastName;
            user_found.password = user.password;
            user_found.email = user.email;
            callback(found_user);
        } else {
            callback(null);
        }
    }

})();