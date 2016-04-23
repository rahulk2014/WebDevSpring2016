/**
 * Created by rahul on 3/17/16.
 */
"use strict";
var q = require("q");

module.exports = function(mongoose, db){

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('aUser',UserSchema);

    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function create(user) {
        var deferred = q.defer();

        UserModel.create(user,
            function (err, document) {
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(document);
                }
            });

        return deferred.promise;
    }

    function findAll() {
        var deferred = q.defer();

        UserModel.find(
            function(err, users){
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    }

    function findById(id) {

        var deferred = q.defer();

        UserModel.findById(id, function(err, user){
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function update(id, user){

        var deferred = q.defer();

        UserModel.findById(id,
            function(err,response){
                if(err){
                    deferred.reject(err);
                }
                else{
                    response.firstName = user.firstName;
                    response.lastName = user.lastName;
                    response.username = user.username;
                    response.password = user.password;
                    response.email = user.email;
                    response.save(
                        function(err, updatedUser) {
                            deferred.resolve(updatedUser);
                        });
                }
            });
        return deferred.promise;
    }

    function remove(id){
        var deferred = q.defer();
        UserModel.remove({_id: id},
            function(err, user){
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
    function findUserByCredentials(credentials){

        var deferred = q.defer();
        UserModel.findOne({ username: credentials.username, password: credentials.password },
            function(err, user){
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

};