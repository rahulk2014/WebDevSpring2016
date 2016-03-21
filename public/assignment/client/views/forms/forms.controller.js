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

        var currentUser = UserService.getCurrentUser();
        if('undefined' === typeof currentUser) {
            $location.url("/home");
        } else {
            FormService.findAllFormsForUser(currentUser._id)
                .then(function(forms){
                    $scope.forms = forms.data;
                }, function(error){
                    console.log("Unable to get forms for UserId");
                });
        }
        $scope.$location = $location;
        $scope.addForm    = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = -1;

        function addForm(form){
            if(!form || !form.title)
                return;
            FormService.createFormForUser(currentUser._id, form)
                       .then(function(forms) {
                            retrieveUserIdForms();
                       }, function(error) {
                           console.log("Unable to create a form.")
                       });
        }

        function retrieveUserIdForms() {
            FormService.findAllFormsForUser(currentUser._id)
                .then(function(forms){
                    $scope.forms = forms.data;
                    $scope.form = {};
                }, function(error) {
                    console.log("Unable to retrieve forms based on the given user id");
                });
        }

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