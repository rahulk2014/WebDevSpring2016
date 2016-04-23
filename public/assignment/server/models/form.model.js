/**
 * Created by rahul on 3/17/16.
 */
"use strict";
var q = require("q");
module.exports = function(mongoose, db){

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form',FormSchema);

    var api = {

        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findFormByUserId: findFormByUserId,
        findFormByTitle: findFormByTitle
    };

    return api;

    function findAll() {
        var deferred = q.defer();
        FormModel.find(
            function(err, forms) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    function create(userId, form) {

        var deferred = q.defer();
        form.userId = userId;
        form.created = new Date();
        form.fields = [];
        FormModel.create(form,
            function(err, createdForm) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(createdForm);
                }
            });
        return deferred.promise;

    }



    function findById(id) {

        var deferred = q.defer();
        FormModel.findById(id,
            function(err, form) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function findFormByUserId(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId},
            function(err, forms) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    function update(id, form){
        var deferred = q.defer();

        FormModel.findById(id,
            function(err, formToUpdate) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    formToUpdate.title = form.title;
                    formToUpdate.udpated = new Date();
                    formToUpdate.save(
                        function(err, updatedForm) {
                            deferred.resolve(updatedForm);
                        });
                }
            });

        return deferred.promise;
    }

    function remove(id){
        var deferred = q.defer();
        FormModel.remove({_id:id},
            function(err, status) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(title){

        var deferred = q.defer();
        FormModel.findOne({title: title},
            function(err, form) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }
};