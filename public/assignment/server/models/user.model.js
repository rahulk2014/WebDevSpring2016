/**
 * Created by rahul on 3/17/16.
 */
module.exports = function(app) {

    var userData = require("./user.mock.json");

    function getAllUsersModel() {
        console.log("In getAllUsersModel()");
        return userData;
    }

    function createUserModel(user) {
        var newUser = {
            "_id" : new Date().getTime(),
            "username" : user.username,
            "password" : user.password
        };

        userData.push(newUser);
        return userData;
    }

    function getUserByUserNameAndPasswordModel(credentials) {
        console.log("In getUserByUserNameAndPasswordModel()");

        for(i in userData) {
            if(userData[i].username == credentials.username && userData[i].password == credentials.password) {
                return userData[i];
            }
        }
        return null;
    }

    function deleteUserByIdModel(id) {
        var user = getUserByIdModel(id);
        if(user) {
            userData.splice(user, 1);
            return userData;
        }
        return null;
    }

    function updateUserIdByIdModel(userId, user) {
        for(i in userData) {
            if(userData[i]._id == userId) {
                userData[i].username = user.username;
                userData[i].password = user.password;
                userData[i].firstName = user.firstName;
                userData[i].lastName = user.lastName;
                userData[i].email = user.email;

                return userData;
            }
        }

        return null;
    }

    function getUserByUserNameModel(username) {

        for(i in userData) {
            if(userData[i].username === username) {
                return userData[i];
            }
        }

        return null;
    }

    function getUserByIdModel(id) {

        for(user in userData) {
            if(userData[user]._id == id) {
                return userData[user];
            }
        }

        return null;
    }
};