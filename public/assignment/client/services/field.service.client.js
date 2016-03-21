/**
 * Created by rahul on 3/19/16.
 */
(function(){

    angular
        .module("FormBuilderApp")
        .factory("FieldService", fieldService);

    function fieldService($http) {

        var model = {
            getFieldsForForm: getFieldsForForm,
            getFieldIdForForm: getFieldIdForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            createFieldForForm: createFieldForForm,
            updateField: updateField
        }

        return model;

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldIdForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/"+formId+"/field/", field);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }
    }

})();