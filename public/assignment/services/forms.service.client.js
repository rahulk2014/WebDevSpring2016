/**
 * Created by rahul on 3/1/16.
 */

"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormServiceFunction);

    function FormServiceFunction($rootScope) {

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        function createFormForUser(userId, form, callback) {
            var nForm = {
                _id : (new Date).getTime(),
                title : form.title,
                userId : userId
            };

            forms.push(nForm);
            callback(nForm);
            return;
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for (var form in forms) {
                if(forms[form].userId === userId) {
                    console.log(forms[form].title);
                    userforms.push(forms[form]);
                }
            }
            callback(userforms);
            return;
        }

        function deleteFormById(formId, callback) {
            var formToBeDeleted = findFormById(formId);
            if(null != formToBeDeleted) {
                forms.splice(forms.indexOf(formToBeDeleted), 1);
            }

            callback(forms);
            return;
        }

    }

})();