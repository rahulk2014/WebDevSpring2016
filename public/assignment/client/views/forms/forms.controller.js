/**
 * Created by rahul on 2/23/16.
 */
"use strict";
(function()
{
     angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, $rootScope , $location, UserService, FormService) {

        UserService.getCurrentUser().then(
            function(response){
                $scope.user = response.data;
                UserService.setCurrentUser(response.data);
                FormService.findAllFormsForUser($scope.user._id).then(
                    function(response){
                        $scope.loggedUserForms = response.data;
                    });
            });

        $scope.addForm    = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = -1;

        var currentForm = {};

        $scope.addForm = function() {
            if($scope.form!=null) {
                currentForm.title = $scope.form;
                FormService.createFormForUser($scope.user._id, currentForm).then(
                    function(response){
                        $scope.forms.push(response.data);
                    });
                $scope.form = null;
                currentForm = {};
            }
        };

        function updateForm(form){
            FormService.updateFormById(form._id, form)
                .then(function(updatedForm){
                    if (selectedIndex>=0){
                        $scope.forms[selectedIndex]=form;
                        $scope.form={};
                        selectedIndex=-1;
                    }
                }, function(error){
                    console.log("Unable to update form");
                });
        }

        function deleteForm(index) {
            var forms = $scope.forms;
            var formId = forms[index]._id;
            FormService.deleteFormById(formId)
                .then(function (allForms) {
                    $scope.forms = allForms.data;
                }, function (error) {
                    console.log("Unable to delete the form");
                });
        }

        function selectForm(index){
            selectedIndex = index;
            var selectedForm= {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };
            $scope.form = selectedForm;
        }
    }
})();