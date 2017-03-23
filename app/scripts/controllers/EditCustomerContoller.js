'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('editCustCtrl', function ($scope, $http, $location, $rootScope) {
    var custId = $location.search().pid;
   $("#custhdid").val(custId);
   var refresh = function () {
       var data = { "id": custId };
       $http.post(
           'https://powerful-retreat-93422.herokuapp.com/customer/getbyid',
               JSON.stringify(data),
               {
                   headers: {
                       'Content-Type': 'application/json'
                   }
               }
           ).success(function (data) {
               $scope.messageShow = data.message;
               if (data.status === "success") {
                   $scope.firstName = data.customer.firstname;
                   $scope.custEmail = data.customer.email;
                   $scope.custMobileno = data.customer.mobileno;
                   $scope.custAddress = data.customer.address;
               }
               else {
                   $scope.successshow = false;
                   $scope.errorshow = true;
               }

           });
     };
    refresh();
    $scope.editCust = function (firstName, custEmail, custMobileno, custAddress) {

        var cushid = $("#custhdid").val();
        var data = { "id": cushid, "firstname": firstName, "email": custEmail, "mobileno": custMobileno, "address": custAddress };

        $http.post(
            'https://powerful-retreat-93422.herokuapp.com/customer/edit',
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