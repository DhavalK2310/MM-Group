'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('addProjCtrl', function ($scope, $http, $location, $rootScope) {
    $scope.successshow = false;
    $scope.errorshow = false;
    $scope.addProj = function (projName, projAddr, projCity) {

        var data = { "name": projName, "address": projAddr, "city": projCity };

        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/project',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).success(function (data) {

                $scope.messageShow = data.message;
                if (data.status === "success") {
                    $scope.successshow = true;
                    $scope.errorshow = false;
                }
                else {
                    $scope.successshow = false;
                    $scope.errorshow = true;
                }
            });
    }
});