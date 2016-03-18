/**
 * Created by rahul on 3/17/16.
 */
module.exports = function(app) {

    var userData = require("./user.mock.json");

    function getAllUsersModel() {
       return userData;
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