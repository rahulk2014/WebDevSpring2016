/**
 * Created by rahul on 3/17/16.
 */
module.exports = function(app) {

    var userData = require("./user.mock.json");

    var api = {
        findAll : findAll,
        findUserByCredentials : findUserByCredentials,
        findUserByUserName : findUserByUserName,
        findUserById : findUserById,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
    };

    return api;

    function findAll() {
        console.log("In findAll()");
        return userData;
    }

    function createUser(user) {
        var newUser = {
            "_id" : new Date().getTime(),
            "username" : user.username,
            "password" : user.password
        };

        userData.push(newUser);
        return userData;
    }

    function findUserByCredentials(credentials) {
        console.log("In findUserByCredentials()");

        for(i in userData) {
            if(userData[i].username == credentials.username && userData[i].password == credentials.password) {
                console.log("User Found = " + userData[i].username);
                return userData[i];
            }
        }
        return null;
    }

    function deleteUser(id) {
        var user = getUserByIdModel(id);
        if(user) {
            userData.splice(user, 1);
            return userData;
        }
        return null;
    }

    function updateUser(userId, user) {
        console.log("In User Model updateUser");
        for(i in userData) {
            if(userData[i]._id == userId) {
                userData[i].username = user.username;
                userData[i].password = user.password;
                userData[i].firstName = user.firstName;
                userData[i].lastName = user.lastName;
                userData[i].email = user.email;

                return userData[i];
            }
        }

        return null;
    }

    function findUserByUserName(username) {

        for(i in userData) {
            if(userData[i].username === username) {
                return userData[i];
            }
        }
        return null;
    }

    function findUserById(id) {

        for(user in userData) {
            if(userData[user]._id == id) {
                return userData[user];
            }
        }

        return null;
    }
};