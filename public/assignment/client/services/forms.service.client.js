/**
 * Created by rahul on 3/1/16.
 */

"use strict";

(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormServiceFunction);

    function FormServiceFunction($rootScope, $http) {

        var model = {
            createFormForUser : createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }

        return model;


        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/"+userId+"/form/", form);
        }


        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId,newForm) {
            return $http.put("/api/assignment/form/"+formId, newForm);
        }
    }
})();