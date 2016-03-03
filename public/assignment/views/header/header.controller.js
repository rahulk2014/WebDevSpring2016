/**
 * Created by rahul on 2/23/16.
 */
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        console.log("In Header Controller");
        $scope.$location = $location;
        $scope.logout = function(){
            UserService.setCurrentUser(null);
            $location.url("#/home");
        }
    }
})();