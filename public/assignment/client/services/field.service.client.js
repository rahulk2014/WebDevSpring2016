/**
 * Created by rahul on 3/19/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService",FieldService);

    function FieldService($http){

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return service;

        function createFieldForForm (formId,field){
            var url = "/api/assignment/form/"+formId+"/field";
            return $http.post(url,field);
        }

        function getFieldsForForm (formId,field){
            var url = "/api/assignment/form/"+formId+"/field";
            return $http.get(url,field);
        }

        function getFieldForForm (formId,fieldId){
            var url = "/api/assignment/form/"+formId+"/field/"+fieldId;
            return $http.get(url);
        }

        function deleteFieldFromForm(formId,fieldId){
            console.log("field service client js");
            console.log(fieldId);

            var url = "/api/assignment/form/"+formId+"/field/"+fieldId;
            return $http.delete(url);
        }

        function updateField(formId,fieldId,field){
            var url = "/api/assignment/form/"+formId+"/field/"+fieldId;
            return $http.post(url,field);
        }
    }
})();