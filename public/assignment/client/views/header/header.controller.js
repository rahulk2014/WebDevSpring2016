/**
 * Created by rahul on 2/23/16.
 */
(function() {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService, $rootScope) {
        console.log("In Header Controller");
        $scope.$location = $location;
        $scope.logout = function(){
            UserService.logout().then(
                function(response){
                    $rootScope.currentUser = null;
                });
        }
    }
})();