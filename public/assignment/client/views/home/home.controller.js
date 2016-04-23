/**
 * Created by rahul on 2/23/16.
 */
"use strict";

(function(){
    console.log("Inside home controller");
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeControllerFunction);

        function HomeControllerFunction($scope, $location, UserService) {
            console.log("In Home controller");
            UserService.getCurrentUser().then(
                function(response){
                    UserService.setCurrentUser(response.data);
                });
        }
})();