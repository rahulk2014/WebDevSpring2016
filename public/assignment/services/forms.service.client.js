/**
 * Created by rahul on 3/1/16.
 */

"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormServiceFunction);

    function FormServiceFunction($rootScope) {

        var model = {
            forms : [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234},
            ],
            findAllFormsForUser: findAllFormsForUser,
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        }

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id : (new Date).getTime(),
                title : form.title,
                userId : userId
            };

            model.forms.push(newForm);
            callback(newForm);
            //return;
        }

        return model;


        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var form in model.forms) {
                if(model.forms[form].userId === userId) {
                    console.log(model.forms[form].title);
                    userForms.push(model.forms[form]);
                }
            }
            callback(userForms);
            //return;
        }

        function deleteFormById(formId, callback) {
            var formToBeDeleted = findFormById(formId);
            if(null != formToBeDeleted) {
                model.forms.splice(model.forms.indexOf(formToBeDeleted), 1);
            }

            callback(model.forms);
            //return;
        }

        function findFormById(formId) {
            console.log("form id"+formId);
            for(var f in model.forms){
                if (model.forms[f]._id === formId){
                    console.log(model.forms[f]);
                    return model.forms[f];
                }
            }
            return null;
        }

        function createFormForUser(userId,form,callback){
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId:userId
            };
            model.forms.push(newForm);
            callback(newForm);
            //return;
        }

        function updateFormById(formId,newForm,callback) {
            for(var form in model.forms) {
                if (model.forms[form]._id == formId){
                    var updatedForm = {
                        _id:newForm._id,
                        title:newForm.title,
                        userId:newForm.userId
                    };
                    model.forms[form] = updatedForm;
                    callback(updatedForm);
                    //return;
                }
            }
        }
    }
})();