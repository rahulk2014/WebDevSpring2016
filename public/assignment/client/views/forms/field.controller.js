/**
 * Created by rahul on 2/23/16.
 */
"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $rootScope, $routeParams, FieldService){

        console.log("Inside Field Controller");
        var formId = $routeParams.formId;
        var userId = $rootScope.userId;

        var map = {};
        map["Single Line Text"] = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
        map["Multi Line Text Field"]= {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
        map["Date"] = {"_id": null, "label": "New Date Field", "type": "DATE"};
        map["Dropdown"] = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
            {"label": "Option 1", "value": "OPTION_1"},
            {"label": "Option 2", "value": "OPTION_2"},
            {"label": "Option 3", "value": "OPTION_3"}
        ]};
        map["Checkboxes"] = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
            {"label": "Option A", "value": "OPTION_A"},
            {"label": "Option B", "value": "OPTION_B"},
            {"label": "Option C", "value": "OPTION_C"}
        ]};
        map["Radio buttons"] = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
            {"label": "Option X", "value": "OPTION_X"},
            {"label": "Option Y", "value": "OPTION_Y"},
            {"label": "Option Z", "value": "OPTION_Z"}
        ]};



        FieldService.getFieldsForForm(formId)
                                    .then(function(fields){
                                        $scope.fields = fields.data;
                                    }, function(error) {
                                        console.log("Unable to retrieve all the fields");
                                    });

        $scope.addField =  function (fieldType) {
                    var fieldObj = map[fieldType];
                    FieldService.createFieldForForm(formId, fieldObj)
                        .then(function(fields){
                            $scope.fields = fields.data;
                        }, function(error){
                            console.log("Unable to add field object.");
                        });
        }

        $scope.updateField = function(index) {
            if($scope.fields[index].type == "OPTIONS" ||
                $scope.fields[index].type == "CHECKBOXES"||
                $scope.fields[index].type == "RADIOS"){
                $scope.fieldsForModal = $scope.fields[index];
                var jsonOptions = JSON.stringify($scope.fields[index].options);
                jsonOptions = JSON.parse(jsonOptions);
                var options = "";
                for(var i = 0 ;i<jsonOptions.length; i++){
                    options += jsonOptions[i].label+","+jsonOptions[i].value+"\n";
                }
                $scope.displayModalOptions = options;
                $scope.displayModalLabel = $scope.fields[index].label;

            }else{
                $scope.fieldsForModal = $scope.fields[index];
            }

        }

        $scope.deleteField = function(index) {
                FieldService.deleteFieldFromForm(formId, $scope.fields[index]._id)
                    .then(function(fields){
                       $scope.fields = fields.data;
                    }, function(error){
                        console.log("Unable to delete the specific field.");
                    });
        }
    }
})();