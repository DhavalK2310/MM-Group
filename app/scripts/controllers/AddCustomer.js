'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('addcustomerCtrl', function ($scope, $http, $location, $rootScope) {

    $scope.successshow = false;
    $scope.errorshow = false;
    $scope.addCustomer = function (firstName, custEmail, custMobileno, custAddress) {

        var data = { "firstname": firstName, "email": custEmail, "mobileno": custMobileno, "address": custAddress };

        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/customer',
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