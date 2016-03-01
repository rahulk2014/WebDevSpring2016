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

})();