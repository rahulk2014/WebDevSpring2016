/**
 * Created by rahul on 4/4/16.
 */

"use strict";

var q = require("q");

module.exports = function(mongoose, webDevDb) {

    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model("Field", FormSchema);

    var api = {

        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        removeField: removeField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function findFieldsByFormId(id){

        var deferred = q.defer();
        FormModel.findById({_id: id},
            function (err, forms) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }


    function findFieldById(formId, fieldId){

        var deferred = q.defer();
        FormModel.findById({_id: formId},
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var fields = form.field;
                    for(var i in fields){
                        if(fields[i]._id == fieldId){
                            deferred.resolve(fields[i]);
                            break;
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function removeField(formId, fieldId){

        var deferred = q.defer();
        console.log(formId);
        console.log(fieldId);
        FormModel.findById(formId,
            function(err, form){
                if(err) {
                    deferred.reject(err);
                } else {
                    console.log(form);
                    var formFields = form.field;
                    for(var i=0; i<formFields.length; i++){
                        if(formFields[i]._id == fieldId){
                            formFields.splice(i,1);
                        }
                    }
                    form.field = formFields;
                    form.save(
                        function(err, updatedForm) {
                            if(err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(updatedForm);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function createField(formId, field){

        var deferred = q.defer();

        FormModel.findById({_id : formId},
            function(err,form){
                if(err){
                    deferred.reject(err);
                } else{
                    if(field._id){
                        delete field._id;
                    }
                    //console.log(form);
                    var fields = form.field;
                    fields.push(field);
                    form.field = fields;
                    form.save(
                        function(err,updatedForm){
                            if(err)
                            {
                                deferred.reject(err);
                            }
                            else
                            {
                                deferred.resolve(updatedForm);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field){

        var deferred = q.defer();

        FormModel.findById({_id: formId},
            function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var fields = form.field;
                    for (var i in fields) {
                        if (fields[i]._id == fieldId) {
                            fields[i] = field;
                            break;
                        }
                    }
                    form.field = fields;
                    form.save(
                        function(err,updatedForm){
                            if(err)
                            {
                                deferred.reject(err);
                            } else
                            {
                                deferred.resolve(updatedForm);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};